# Image Processing Service

## Description

This project implements a modern, scalable, and resilient image processing service. The service accepts image processing jobs via an API, stores the image data in a blob store, submits the job to a worker service, and provides endpoints to query job status and retrieve job results.

## Features

- **Submit Job**: Accepts image data and job metadata, stores the image in a blob store, and submits a job to the worker service.
- **Query Job Status**: Allows querying the status of a submitted job.
- **Get Job Result**: Provides the results of a completed job.

## Workflow

1. **Client Submits Job**:
   - Client sends a POST request with JWT token and image data (base64 encoded) to the `/job` endpoint.
   - The service validates the JWT token and extracts metadata.
   - The image is stored in a blob store.
   - A job object is created and submitted to the worker service.

2. **Job Processing**:
   - The worker service processes the job asynchronously.

3. **Query Job Status**:
   - Client sends a GET request to `/job/:id/status` to query the job status.
   - The service queries the worker service for the current status of the job.

4. **Get Job Result**:
   - Client sends a GET request to `/job/:id/result` to retrieve the job result.

## File Structure

├── src/
│ ├── app.module.ts
│ ├── main.ts
│ ├── job/
│ │ ├── job.module.ts
│ │ ├── job.service.ts
│ │ ├── job.controller.ts
│ │ ├── job.model.ts
│ │ ├── job.dto.ts
│ │ ├── jwt.strategy.ts

├── .env
├── .gitignore
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json


## RUN APPLICATION

 **Clone the repository**:
   git clone https://github.com/your-username/image-processing-service.git
   cd image-processing-service.

 **Install dependency**:
  npm install

 **Setup environment variables**:
  WORKER_SERVICE_URL=http://localhost:5000/api/v1
  BLOB_STORE_URL=http://localhost:5000/api/v1
  JWT_SECRET=your_jwt_secret

 **Run Application**:
  npm run start
