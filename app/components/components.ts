namespace BooksApp.components {
	class BookComponent implements ng.IComponentOptions {
		templateUrl = "components/book.component.html";
		controller = "BookController";
		bindings = {
			data: '<'
		};
		controllerAs = "controller";
	}

	class BookComponentController implements ng.IController {
		data: BooksApp.interfaces.Book;

		constructor(private $scope, private $http: ng.IHttpService){
		}
	}

	var popular_books = angular.module('books').component("book", new BookComponent());
	popular_books.controller('BookController', BookComponentController);
}