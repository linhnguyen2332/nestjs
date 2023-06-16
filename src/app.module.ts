import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film, Actor, Customer, FilmActor, FilmText, Inventory, Payment, Address, Category, City, Country, FilmCategory, Language, Rental, Staff, Store } from './entities/entities';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';
import { ActorController } from './controllers/actor.controller';
import { CustomerController } from './controllers/customer.controller';
import { ActorService } from './services/actor.service';
import { CustomerService } from './services/customer.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sakila',
      entities: [
        Film,
        Actor,
        Customer,
        FilmActor,
        FilmText,
        Inventory,
        Payment,
        Address,
        Category,
        City,
        Country,
        FilmCategory,
        Language,
        Rental,
        Staff,
        Store,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Film,
      Actor,
      Customer,
      FilmActor,
      FilmText,
      Inventory,
      Payment,
      Address,
      Category,
      City,
      Country,
      FilmCategory,
      Language,
      Rental,
      Staff,
      Store,
    ]), // Đăng ký repository cho Enity
  ],
  controllers: [FilmController, ActorController, CustomerController], // Đăng ký Controller
  providers: [FilmService, ActorService, CustomerService], // Đăng ký Service
})
export class AppModule {}
