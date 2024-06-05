import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    HttpModule,
  ],
  controllers: [JobController],
  providers: [JobService, JwtStrategy],
})
export class JobModule {}
