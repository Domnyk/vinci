const express = require('express'),
      http = require('http'),
      path = require('path'),
      app = express(),
      port = process.env.PORT || '80',
      forceSsl = (req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
          return res.redirect(['https://', req.get('Host'), req.url].join(''));
        }
        return next();
      };

app.use(express.static(path.join(__dirname, 'dist/vinci')));
app.use(forceSsl);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/vinci/index.html'));
});

http
  .createServer(app)
  .listen(port, () => console.log('Running'));

