const express = require('express'),
      http = require('http'),
      path = require('path'),
      app = express(),
      port = process.env.PORT || '8080';

app.use(express.static(path.join(__dirname, 'dist/vinci')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/vinci/index.html'));
});

http
  .createServer(app)
  .listen(port, () => console.log('Running'));

