namespace BooksApp.components {
	
	class PageOfBooksComponent implements ng.IComponentOptions {
		templateUrl = "components/page_of_books.component.html";
		controller = "PageController";
		controllerAs = "controller";
	}

	class PageOfBooksComponentController implements ng.IController {
		data: BooksApp.interfaces.Book[];

		constructor(private bookdata) {
			this.getData();
		}

		private getData(){
			this.bookdata.getPage().subscribe({
				onNext: page => {
					this.data = page;
				},
				onError: data => {
					this.data = [
						{
							title: "Sorry, we couldn't find any books!",
							author: "",
							published: new Date().toString(),
							rating: 0,
							isbn: "",
							store_links: [],
							thumbnail: "",
							description: ""
						}
					];
				}
			})
		}

		public nextPage(){
			this.bookdata.advancePage();
			this.getData();
		}

		public previousPage(){
			this.bookdata.previousPage();
			this.getData();
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
			this.setShowDetails(false);
		}

		public getTitle(): string {
			return this.data.title;
		}

		public getAuthor(): string {
			return this.data.author;
		}

		public getRating(): string {
			return this.data.rating.toString();
		}

		public getPublicationYear(): string{
			var d = new Date(this.data.published);
			return d.getFullYear().toString();
		}

		public getStoreLinks(): BooksApp.interfaces.Store[] {
			return this.data.store_links;
		}

		public getDescription(): string {
			return this.data.description;
		}

		public getThumbnail(): string {
			return this.data.thumbnail;
		}

		private setShowDetails(val : boolean){
			this.showDetails = val;
		}

		public toggleDetails(){
			this.setShowDetails(!this.showDetails);
		}
	}

	var page_of_books = angular.module('books').component("pageOfBooks", new PageOfBooksComponent());
	page_of_books.controller("PageController", PageOfBooksComponentController);

	var popular_books = page_of_books.component("book", new BookComponent());
	popular_books.controller('BookController', BookComponentController);
}