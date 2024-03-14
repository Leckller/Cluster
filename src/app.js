const cluster = require('node:cluster');
const cpuNumber = require('os').cpus().length
const express = require('express');
const app = express();

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNumber; i++) {
    cluster.fork();
  }
} else if (cluster.isWorker) {
  app.listen(8000, () => {
    console.log(process.pid)
  })
  app.get('/', (req, res, next) => {
    res.status(200).send();
    console.log('cluster' + cluster.worker.process.pid);
    next();
  })
}

module.exports = app;