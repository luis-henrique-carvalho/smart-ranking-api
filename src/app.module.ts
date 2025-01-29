import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { IsUniqueConstraint } from './utils/validations/isUniqueValidation/isUnique.class';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
// modules
import { UserModule } from './modules/user/user.module';
import { TeamModule } from './modules/team/team.module';

@Module({
  imports: [PrismaModule, UserModule, TeamModule],
  controllers: [AppController],
  providers: [
    AppService,
    IsUniqueConstraint,
    { provide: 'APP_FILTER', useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
