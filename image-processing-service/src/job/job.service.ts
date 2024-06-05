import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Job } from './entities/job.entity';

@Injectable()
export class JobService {
  constructor(private httpService: HttpService) {}

  async submitJob(
    imageData: string,
    contentType: string,
    contentLength: number,
    metadata: any,
  ) {
    // Upload to blob store
    const blobResponse = await firstValueFrom(
      this.httpService.post(`${process.env.BLOB_STORE_URL}/blob`, imageData, {
        headers: {
          'Content-Type': contentType,
          'Content-Length': contentLength,
        },
      }),
    );
    const blobId = blobResponse.data.id;

    // Create job metadata
    const job: Job = {
      tenentId: metadata.tid,
      clientId: metadata.oid,
      payload: blobId,
      payloadSize: contentLength,
    };

    // Submit job to worker service
    const workerResponse = await firstValueFrom(
      this.httpService.post(`${process.env.WORKER_SERVICE_URL}/job`, job),
    );
    return workerResponse.data;
  }

  async getJobStatus(jobId: string) {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.WORKER_SERVICE_URL}/job/${jobId}/status`,
      ),
    );
    return response.data;
  }

  async getJobResult(jobId: string) {
    const response = await firstValueFrom(
      this.httpService.get(`${process.env.WORKER_SERVICE_URL}/job/${jobId}`),
    );
    return response.data;
  }
}
