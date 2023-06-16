import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from '../entities/entities';

describe('CustomerService', () => {
  let service: CustomerService;
  let customerRepository: Repository<Customer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Phần kiểm thử khác cho CustomerService
});
