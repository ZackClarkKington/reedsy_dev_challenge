'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Reedsy dev challenge', function() {


  describe('index page', function(){
    beforeEach(function(){
      browser.get('index.html');
    })

    it('should have a title', function(){
      expect(browser.getTitle()).toEqual('Books');
    })
  })
});
