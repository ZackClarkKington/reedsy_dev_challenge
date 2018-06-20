namespace BooksApp.services {
	export class BookListService {
		books: BooksApp.interfaces.BookList;

		constructor(private $http, rx){

			this.books = {
				books: [],
				moreBooks: false,
				pageNum: 0
			};
		}

		advancePage(){
			if(this.books.moreBooks) this.books.pageNum++;
		}

		previousPage(){
			if(this.books.pageNum > 0) this.books.pageNum--;
		}

		//Observable used to inform caller when data is ready
		getPage(): Rx.Observable<any>{
			var generate_page = (observer: Rx.Observer<any>) => {
				var page: BooksApp.interfaces.Book[] = [];
				let min_index = this.books.pageNum * 5
				let max_index = min_index + 5
				for(var i = min_index; i < max_index && i < this.books.books.length; i++){
					page.push(this.books.books[i]);
				}

				this.books.moreBooks = (max_index < this.books.books.length);
				observer.onNext(page)
			};

			return Rx.Observable.create((observer) => {
				//Only make the HTTP request for books data if it hasn't already been made
				if(this.books.books.length == 0){
					this.$http.get('/books.json')
						.then((response)=> {
							//After a response has been received, process the data
							let bestsellers = response.data;
							for(var index in bestsellers['results']){
								let book_details = bestsellers['results'][index]['book_details'][0];
								let date_published = bestsellers['results'][index]['published_date'];
								this.books.books.push({
									title: book_details['title'],
									author: book_details['author'],
									published: date_published,
									rating: book_details['average_rating'] * 2,
									isbn: book_details['primary_isbn10']
								})
							}
						}).then(()=> {
							//Generate a page of 5 books to be used by the caller
							generate_page(observer)
						});
				} else {
					//If the HTTP request has already been made before, then we can just generate a page of books for the caller
					generate_page(observer);
				}
			})

		}
	}

	angular.module('books').service('bookdata', BookListService);
}