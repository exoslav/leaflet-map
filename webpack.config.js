var ExtractText = require('extract-text-webpack-plugin');
var webpack = require('webpack');

// tohle je zhruba zakladni nastaveni konfigurace webpacku
module.exports = (function(env) {

  /*
  environment:
    - dev = developement
    - pro = production
  */

  if (!env)
    env = 'dev';

  var environment =  env == 'dev' ? 'developement' : 'production';

  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('----------------------------------------------------------------');
  console.log('--- webpack has started in "' + environment + '" environment ---');
  console.log('----------------------------------------------------------------');

  var config = { // zakladni nastaveni webpacku
    // jeden svtupni soubor:
    entry: {
      base: './app/main.js' // vstupni soubor pro webpacku
    },
    output: {
      path: './app/dist', // kam se buodu vysledne soubory ukladat
      filename: 'main.js' // nazev zkompilovaneho souboru
    },
    module: {
      loaders: [ // loadery, ktere se aplikuji dle pravidel v loaders.test (coz je v podstate regularni vyraz)
        {
          test: /\.js?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.scss$/,
          loader: ExtractText.extract('style', 'css!sass')
        }
      ]
    },
    plugins: [
      new ExtractText('main.css', { // vygenereuje CSS do samostatneho souboru, vice zde: https://github.com/webpack/extract-text-webpack-plugin, pokud tento plugin pouzijeme, tak nam nebude fungovat HOT REALOAD
        allChunks: true
      }),
      // new webpack.optimize.CommonsChunkPlugin('common')
    ]
  }

  // pokud jsme ve fazi vyvoje, webpack bude delat dalsi kopu veci
  if (env === 'dev') {
    config.devtool = 'source-map' // v podstate stejny prikaz jako "webpack -w --devtool source-map ./app/src/js/global.js dist/bundle.js" - viz. readme
  }

  return config;

})('dev')
