import { Test, TestingModule } from '@nestjs/testing';
import { FilmService } from './film.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from '../entities/entities';

describe('FilmService', () => {
  let service: FilmService;
  let filmRepository: Repository<Film>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmService,
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FilmService>(FilmService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should return all films', async () => {
  //   // Mock dữ liệu trả về từ filmRepository.find()
  //   const expectedFilms: Film[] = [
  //     { id: 1, title: 'Film 1', ... },
  //     { id: 2, title: 'Film 2', ... },
  //     // Các đối tượng Film khác
  //   ];
  //   jest.spyOn(filmRepository, 'find').mockResolvedValue(expectedFilms);

  //   // Gọi phương thức getAllFilms()
  //   const films = await service.getAllFilms();

  //   // Kiểm tra kết quả trả về
  //   expect(films).toEqual(expectedFilms);
  // });
});
