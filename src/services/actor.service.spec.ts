import { Test, TestingModule } from '@nestjs/testing';
import { ActorService } from './actor.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Actor } from '../entities/entities';

describe('ActorService', () => {
  let service: ActorService;
  let actorRepository: Repository<Actor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActorService,
        {
          provide: getRepositoryToken(Actor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ActorService>(ActorService);
    actorRepository = module.get<Repository<Actor>>(getRepositoryToken(Actor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Phần kiểm thử khác cho ActorService
});
