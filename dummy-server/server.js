const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

// Mock data structures
let jobs = {};
let jobCounter = 1;
let blobs = {};
let blobCounter = 1;

// Mock endpoint to submit a job
app.post("/api/v1/job", (req, res) => {
  const jobId = jobCounter++;
  jobs[jobId] = { ...req.body, status: "RUNNING" };
  res.json({ job_id: jobId });
});

// Mock endpoint to get job result
app.get("/api/v1/job/:jobId", (req, res) => {
  const jobId = req.params.jobId;
  const result = jobs[jobId] || "NOT_FOUND";
  res.json(result);
});

// Mock endpoint to get job status
app.get("/api/v1/job/:jobId/status", (req, res) => {
  const jobId = req.params.jobId;
  const status = jobs[jobId]?.status || "NOT_FOUND";
  res.json({ status });
});

// Mock endpoint to upload a blob
app.post("/api/v1/blob", (req, res) => {
  const blobId = blobCounter++;
  blobs[blobId] = req.body;
  res.json({ blob_id: blobId });
});

// Mock endpoint to get a blob
app.get("/api/v1/blob/:blobId", (req, res) => {
  const blobId = req.params.blobId;
  const blobData = blobs[blobId] || "";
  res.send(blobData);
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
