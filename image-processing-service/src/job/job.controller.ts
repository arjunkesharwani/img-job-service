import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('job')
@UseGuards(AuthGuard('jwt'))
export class JobController {
  constructor(private jobService: JobService, private jwtService: JwtService) {}

  @Post()
  async createJob(@Body() jobData: CreateJobDto, @Headers() headers: any) {
    const token = headers.authorization.split(' ')[1];
    const decoded = this.jwtService.decode(token) as any;
    const metadata = {
      tid: decoded.tid,
      oid: decoded.oid,
    };
    const contentType = 'application/octet-stream';
    const contentLength = Buffer.byteLength(jobData.content, 'base64');
    return this.jobService.submitJob(
      jobData.content,
      contentType,
      contentLength,
      metadata,
    );
  }

  @Get(':id/status')
  async getJobStatus(@Param('id') jobId: string) {
    return this.jobService.getJobStatus(jobId);
  }

  @Get(':id/result')
  async getJobResult(@Param('id') jobId: string) {
    return this.jobService.getJobResult(jobId);
  }
}
