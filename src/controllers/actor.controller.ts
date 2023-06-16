import { Controller, Get, Query } from '@nestjs/common';
import { ActorService } from '../services/actor.service';

@Controller('actors')
export class ActorController {
  constructor(private actorService: ActorService) {}

  @Get('rental-duration')
  async getAverageRentalDurationByActorAndCategory(): Promise<any[]> {
    return this.actorService.getAverageRentalDurationByActorAndCategory();
  }

  @Get('appeared-PG13-rated-film')
  async findActors(): Promise<any[]> {
    return this.actorService.findActors();
  }
}
