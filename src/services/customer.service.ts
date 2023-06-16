import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Film,
  Actor,
  Customer,
  FilmActor,
  FilmCategory,
  FilmText,
  Inventory,
  Payment,
  Rental,
} from '../entities/entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findTopCustomers(limit: number): Promise<any[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .select(
        'CONCAT(customer.first_name, " ", customer.last_name)',
        'fullName',
      )
      .addSelect('SUM(payment.amount)', 'totalPayment')
      .leftJoin('customer.payments', 'payment')
      .groupBy('customer.customer_id')
      .orderBy('totalPayment', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  async findCustomersWithMultipleRentals(): Promise<any[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .select([
        'customer.first_name',
        'customer.last_name',
        'COUNT(*) as rental_count',
      ])
      .innerJoin('customer.rentals', 'rental1')
      .innerJoin(
        'customer.rentals',
        'rental2',
        'rental1.customer_id = rental2.customer_id',
      )
      .andWhere('rental1.rental_id <> rental2.rental_id')
      .andWhere('rental1.rental_date = rental2.rental_date')
      .innerJoin('rental1.inventory', 'inventory')
      .groupBy('customer.customer_id')
      .having('rental_count > 1')
      .getRawMany();
  }

  async findCustomersWithMoreThan10Rentals(): Promise<any[]> {
    return this.customerRepository
      .createQueryBuilder('customer')
      .select([
        'customer.first_name',
        'customer.last_name',
        'COUNT(*) as number_of_rentals',
        'SUM(payment.amount) as total_rental_fee',
      ])
      .innerJoin('customer.payments', 'payment')
      .innerJoin('payment.rental', 'rental')
      .groupBy('customer.customer_id')
      .having('COUNT(*) > 10')
      .getRawMany();
  }
}
