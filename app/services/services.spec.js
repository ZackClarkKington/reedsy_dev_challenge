'use strict';

describe('BookList service', function(){

	beforeEach(module('books'));


	it('should exist', inject(function(bookdata){
		expect(bookdata).toBeDefined();
	}));

	it('should have a booklist property', inject(function(bookdata){
		expect(bookdata.books).toBeDefined();
		expect(bookdata.books.books).toBeDefined();
		expect(bookdata.books.moreBooks).toBeDefined();
		expect(bookdata.books.pageNum).toBeDefined();
	}));

	it('should instantiate booklist correctly', inject(function(bookdata){
		expect(bookdata.books.moreBooks).toEqual(false);
		expect(bookdata.books.pageNum).toEqual(0);
	}));

	it('should advance a page if there are more books when advancePage is called', inject(function(bookdata){
		bookdata.books.moreBooks = true;
		bookdata.advancePage();
		expect(bookdata.books.pageNum).toEqual(1);
	}));

	it('should go to a previous page if pageNum > 0 when previousPage is called', inject(function(bookdata){
		bookdata.books.pageNum = 2;
		bookdata.previousPage();
		expect(bookdata.books.pageNum).toEqual(1);
	}));

	describe('normaliseString()', function(){
		it('defines a normaliseString method', inject(function(bookdata){
			expect(bookdata.normaliseString).toBeDefined();
			expect(typeof(bookdata.normaliseString)).toEqual('function');
		}));

		it('returns a string where only the first letter of each word is capitalised', inject(function(bookdata){
			var str = 'TEST STRING';
			var expected_result = 'Test String';

			expect(bookdata.normaliseString(str)).toEqual(expected_result);
		}));
	});

	describe('hasMorePages()', function(){
		it('defines a hasMorePages method', inject(function(bookdata){
			expect(bookdata.hasMorePages).toBeDefined();
			expect(typeof(bookdata.hasMorePages)).toEqual('function');
		}));

		it('returns whether there are more pages to view', inject(function(bookdata){
			expect(bookdata.hasMorePages()).toEqual(false);
			bookdata.books.moreBooks = true;
			expect(bookdata.hasMorePages()).toEqual(true);
		}));
	});

	describe('hasPreviousPages()', function(){
		it('defines a hasPreviousPages method', inject(function(bookdata){
			expect(bookdata.hasPreviousPages).toBeDefined();
			expect(typeof(bookdata.hasPreviousPages)).toEqual('function');
		}));

		it('returns whether there are any previous pages', inject(function(bookdata){
			expect(bookdata.hasPreviousPages()).toEqual(false);
			bookdata.books.pageNum = 1;
			expect(bookdata.hasPreviousPages()).toEqual(true);
		}));
	});

	describe('getPageNum()', function(){
		it('defines a getPageNum method', inject(function(bookdata){
			expect(bookdata.getPageNum).toBeDefined();
			expect(typeof(bookdata.getPageNum)).toEqual('function');
		}));

		it('returns the current page number', inject(function(bookdata){
			expect(bookdata.getPageNum()).toEqual(1);
			bookdata.books.pageNum = 1;
			expect(bookdata.getPageNum()).toEqual(2);
		}));
	});

	describe('getNumberOfPages()', function(){
		it('defines a getNumberOfPages method', inject(function(bookdata){
			expect(bookdata.getNumberOfPages).toBeDefined();
			expect(typeof(bookdata.getNumberOfPages)).toEqual('function');
		}));

		it('returns the current number of pages', inject(function(bookdata){
			expect(bookdata.getNumberOfPages()).toEqual(0);
			bookdata.books.books.length = 10;
			expect(bookdata.getNumberOfPages()).toEqual(2);
		}));
	});

	describe('getPage()', function(){
		var books = readJSON('books.json');

		it('should request books.json', inject(function(bookdata, $httpBackend){
			bookdata.getPage().subscribe({
				onNext: function(result){
				}
			});

			$httpBackend
			.expect('GET', '/books.json')
			.respond(200,books);
			$httpBackend.flush();
		}));

		it('should generate a page of books to be displayed', inject(function(bookdata, $httpBackend){
			bookdata.getPage().subscribe({
				onNext: function(result){
					expect(result.length).toEqual(5);
					for(var index in result){
						expect(result[index].title).toBeDefined();
						expect(result[index].author).toBeDefined();
						expect(result[index].published).toBeDefined();
						expect(result[index].rating).toBeDefined();
						expect(result[index].isbn).toBeDefined();
						expect(result[index].store_links).toBeDefined();
						expect(result[index].thumbnail).toBeDefined();
						expect(result[index].description).toBeDefined();
					}
				}
			});

			$httpBackend
			.expect('GET', '/books.json')
			.respond(200, books);
			$httpBackend.flush();
		}));
	})
})