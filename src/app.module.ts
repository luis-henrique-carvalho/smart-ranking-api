import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { IsUniqueConstraint } from './utils/validations/isUniqueValidation/isUnique.class';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint],
})
export class AppModule {}
