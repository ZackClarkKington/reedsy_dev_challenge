//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'bower_components/karma-read-json/karma-read-json.js',
      'bower_components/angular/angular.js',
      'bower_components/rxjs/modules/rx-lite/rx.lite.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/rx-angular/modules/rx.lite.angular/rx.lite.angular.js',
      'app.js',
      'components/**/*.js',
      'services/**/*.js',
      'app.spec.js',
      'components/**/*.spec.js',
      'services/**/*.spec.js',
      {pattern: 'books.json', included: false}
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
