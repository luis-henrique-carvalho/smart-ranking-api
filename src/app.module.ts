import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PlayerModule } from './player/player.module';
import { IsUniqueConstraint } from './utils/validations/isUniqueValidation/isUnique.class';

@Module({
  imports: [PrismaModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
