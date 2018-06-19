namespace BooksApp {
	var app = angular.module('books', []);

	class AppController {
		books: BooksApp.interfaces.BookList;

		constructor(private $scope, private $http: ng.IHttpService){
			this.books = {
				books: [],
				moreBooks: false,
				pageNum: 0
			};

			$http.get('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=afe357b7d35a401f8e8e69da6cb13c3b')
				.then((response)=> {
					let bestsellers = response.data;
					for(var index in bestsellers['results']){
						let book_details = bestsellers['results'][index]['book_details'][0];
						console.log(book_details);
						this.books.books.push({
							title: book_details['title'],
							author: book_details['author'],
							published: new Date(),
							rating: 0,
							isbn: book_details['primary_isbn10']
						})
					}
					$scope.books = this.books.books;
				})
		}

		
	}

	app.controller('ViewController', AppController);
}