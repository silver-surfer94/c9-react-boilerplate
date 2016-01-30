const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');

const port = process.env.PORT || 3000;
const ip = process.env.IP || '127.0.0.1';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  quiet: false,
  lazy: false,
  stats: {
    colors: true,
    cached: false
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(port, ip, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`App listening at http://${ip}:${port}`);
  console.log('Performing initial build...')
});
