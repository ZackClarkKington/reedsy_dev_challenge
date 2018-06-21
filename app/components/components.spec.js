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

		let test_book = {
			title: 'Test title',
			author: 'Test author',
			published: '2018-06-21',
			rating: 5,
			isbn: '0123456789',
			store_links: [
				{store_name: 'Test Store', link: 'https://example.com'}
			],
			thumbnail: 'https://example.com',
			description: 'Test description'
		};

		let expected_result = {
			title: test_book.title,
			author: test_book.author,
			published: '2018',
			rating: '5',
			store_links: test_book.store_links,
			thumbnail: test_book.thumbnail,
			description: test_book.description
		}

		it('sets BookController as controller', inject(function($controller){
			var BookController = $controller('BookController');
			expect(BookController).toBeDefined();
		}));

		describe('BookController.getTitle()', function(){
			it('defines a getTitle method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getTitle).toBeDefined();
				expect(typeof(BookController.getTitle)).toEqual('function');
			}));


			it('returns a string containing the book title', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getTitle()).toEqual(expected_result.title);
			}));
		});

		describe('BookController.getAuthor()', function(){
			it('defines a getAuthor method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getAuthor).toBeDefined();
				expect(typeof(BookController.getAuthor)).toEqual('function');
			}));

			it('returns a string containing the author of the book', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getAuthor()).toEqual(expected_result.author);
			}));
		});

		describe('BookController.getRating()', function(){
			it('defines a getRating method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getRating).toBeDefined();
				expect(typeof(BookController.getRating)).toEqual('function');
			}));

			it('returns a string representation of the book rating', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getRating()).toEqual(expected_result.rating);
			}));
		});

		describe('BookController.getPublicationYear()', function(){
			it('defines a getPublicationYear method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getPublicationYear).toBeDefined();
				expect(typeof(BookController.getPublicationYear)).toEqual('function');
			}));

			it('returns a string representation of the publication year', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getPublicationYear()).toEqual(expected_result.published);
			}));
		});

		describe('BookController.getStoreLinks()', function(){
			it('defines a getStoreLinks method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getStoreLinks).toBeDefined();
				expect(typeof(BookController.getStoreLinks)).toEqual('function');
			}));

			it('returns an array of Store objects', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getStoreLinks()).toEqual(expected_result.store_links);
			}));
		});

		describe('BookController.getDescription()', function(){
			it('defines a getDescription method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getDescription).toBeDefined();
				expect(typeof(BookController.getDescription)).toEqual('function');
			}));

			it('returns a string containing the description', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getDescription()).toEqual(expected_result.description);
			}));
		});

		describe('BookController.getThumbnail()', function(){
			it('defines a getThumbnail method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.getThumbnail).toBeDefined();
				expect(typeof(BookController.getThumbnail)).toEqual('function');
			}));

			it('returns a string containing the thumbnail url', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.data = test_book;
				expect(BookController.getThumbnail()).toEqual(expected_result.thumbnail);
			}));
		});

		describe('BookController.toggleDetails()', function(){
			it('defines a toggleDetails method', inject(function($controller){
				var BookController = $controller('BookController');
				expect(BookController.toggleDetails).toBeDefined();
				expect(typeof(BookController.toggleDetails)).toEqual('function');
			}));

			it('toggles the showDetails property', inject(function($controller){
				var BookController = $controller('BookController');
				BookController.toggleDetails();
				expect(BookController.showDetails).toEqual(true);
				BookController.toggleDetails();
				expect(BookController.showDetails).toEqual(false);
			}));
		});
	});
});