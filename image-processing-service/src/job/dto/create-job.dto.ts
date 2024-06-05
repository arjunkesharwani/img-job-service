export class CreateJobDto {
  encoding: string;
  MD5: string;
  content: string;
}

export interface Job {
  tenantId: string;
  clientId: string;
  payload: string;
  payloadSize: number;
}
