namespace BooksApp.components {
	
	class PageOfBooksComponent implements ng.IComponentOptions {
		templateUrl = "components/page_of_books.component.html";
		controller = "PageController";
		controllerAs = "controller";
	}

	class PageOfBooksComponentController implements ng.IController {
		data: BooksApp.interfaces.Book[];

		constructor(private bookdata) {
			bookdata.getPage().subscribe({
				onNext: page => {
					this.data = page;
				}
			});
		}

		nextPage(){
			this.bookdata.advancePage();
			this.bookdata.getPage().subscribe({
				onNext: page => {
					this.data = page;
				}
			});
		}

		previousPage(){
			this.bookdata.previousPage();
			this.bookdata.getPage().subscribe({
				onNext: page => {
					this.data = page;
				}
			});
		}
	}

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
		showDetails: boolean;

		constructor(){
			this.showDetails = false;
		}

		getTitle(): string {
			return this.data.title;
		}

		getAuthor(): string {
			return this.data.author;
		}

		getRating(): string {
			return this.data.rating.toString();
		}

		getPublicationYear(): string{
			var d = new Date(this.data.published);
			return d.getFullYear().toString();
		}

		getStoreLinks(): BooksApp.interfaces.Store[] {
			return this.data.store_links;
		}

		getDescription(): string {
			return this.data.description;
		}

		getThumbnail(): string {
			return this.data.thumbnail;
		}

		toggleDetails(){
			this.showDetails = !this.showDetails;
		}
	}

	var page_of_books = angular.module('books').component("pageOfBooks", new PageOfBooksComponent());
	page_of_books.controller("PageController", PageOfBooksComponentController);

	var popular_books = page_of_books.component("book", new BookComponent());
	popular_books.controller('BookController', BookComponentController);
}