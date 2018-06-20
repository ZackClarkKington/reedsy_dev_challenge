'use strict';
describe('BooksApp.components', function(){
	describe('PageOfBooksComponent', function(){
		beforeEach(module('books'));

		it('sets PageController as controller', inject(function($controller){
			var PageController = $controller('PageController');
			expect(PageController).toBeDefined();
		}));

		describe('PageOfBooksComponentController', function(){
			it('defines a nextPage method', inject(function($controller){
				var PageController = $controller('PageController');
				expect(PageController.nextPage).toBeDefined();
				expect(typeof(PageController.nextPage)).toEqual('function');
			}));

			it('defines a previousPage method', inject(function($controller){
				var PageController = $controller('PageController');
				expect(PageController.previousPage).toBeDefined();
				expect(typeof(PageController.previousPage)).toEqual('function');
			}));
		});
	});

	describe('BookComponent', function(){
		beforeEach(module('books'));

		it('sets BookController as controller', inject(function($controller){
			var BookController = $controller('BookController');
			expect(BookController).toBeDefined();
		}));
	})
});