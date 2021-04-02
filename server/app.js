const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build'), {
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.html') || path.endsWith('bundle.js')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      const cacheMaxAge = 60 * 60 * 24 * 100; // 100 days
      res.setHeader('Cache-Control', `max-age=${cacheMaxAge}`);
    }
  },
}));

app.use(function(req, res, next) {
  if (req.path.length > 1 && /\/$/.test(req.path)) {
    var query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
  } else {
    next()
  }
});

app.get('/**/*', (req, res) => {
  res.redirect(301, '/404')
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(5000);
console.log('Server is listening on http://localhost:5000');
