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
	}))

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