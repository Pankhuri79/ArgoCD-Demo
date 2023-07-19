const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 8080;

// Create custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpRequestDurationHistogram = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration histogram',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Middleware to collect metrics for each request
app.use((req, res, next) => {
  const start = Date.now();

  // Add labels to the custom metrics
  const labels = { method: req.method, route: req.path };

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDurationHistogram.observe(labels, duration);
    httpRequestCounter.inc(labels);
  });

  next();
});

// Your application routes
app.get('/', (req, res) => {
  const message = `
    <!DOCTYPE html>
    <!-- Your existing HTML content -->
    <!-- ... -->
  `;
  res.send(message);
});

// Expose metrics endpoint for Prometheus to scrape
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
