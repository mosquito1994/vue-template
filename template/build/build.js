require('./check-versions')();

process.env.NODE_ENV = 'production'

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs')

var spinner = ora('building for production...')
spinner.start()

rm(config.build.assetsRoot, err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err

    // 写入生成的js和css文件路径
    var file = {
      js: stats.toString().match(/static\/js\/app\.(\w+)\.js/g)[1]
    }
    fs.writeFile(path.join(config.build.assetsRoot, config.build.assetsSubDirectory, "/static.config.json"), JSON.stringify(file), function (err) {
      if (err) {
        throw err;
      }
    });
    
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow( 
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
