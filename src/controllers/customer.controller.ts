import { Controller, Get, Query } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Get('top-customers')
  async getAllFilmsWithRatesAndCosts(@Query('limit') limit: number) {
    return this.customerService.findTopCustomers(limit);
  }

  @Get('multiple-rentals')
  async findCustomersWithMultipleRentals() {
    return this.customerService.findCustomersWithMultipleRentals();
  }

  @Get('more-than-10-rentals')
  async findCustomersWithMoreThan10Rentals() {
    return this.customerService.findCustomersWithMoreThan10Rentals();
  }
}
