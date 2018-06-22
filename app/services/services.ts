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

		public hasMorePages(): boolean{
			return this.books.moreBooks;
		}

		public hasPreviousPages(): boolean{
			return (this.books.pageNum > 0);
		}

		public advancePage(){
			if(this.hasMorePages()) this.books.pageNum++;
		}

		public previousPage(){
			if(this.hasPreviousPages()) this.books.pageNum--;
		}

		public getPageNum(): number{
			return this.books.pageNum + 1;
		}

		public getNumberOfPages(): number{
			return this.books.books.length / 5;
		}

		/* This method for normalising a string (i.e. converting to lowercase and capitalising first letter of each word)
			will only work on ASCII characters and is based off the StackOverflow answer found here: 
			https://stackoverflow.com/questions/2332811/capitalize-words-in-string
		*/
		private normaliseString(str: string): string {
			var lowercased = str.toLowerCase();
			return lowercased.replace(/\b\w/g, function(l){ return l.toUpperCase() });
		}

		//Observable used to inform caller when data is ready
		public getPage(): Rx.Observable<any>{
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
								let book = bestsellers['results'][index];
								let book_details = book['book_details'][0];
								let date_published = book['published_date'];
								var book_obj = {
									title: this.normaliseString(book_details['title']),
									author: book_details['author'],
									published: date_published,
									rating: book_details['average_rating'] * 2,
									isbn: book_details['primary_isbn10'],
									store_links: [],
									thumbnail: book['thumbnail'],
									description: book_details['description']
								};

								if(book['amazon_product_url'] != null){
									book_obj.store_links.push({
										store_name: 'Amazon',
										link: book['amazon_product_url']
									})
								}

								if(book['ibooks_product_url'] != null){
									book_obj.store_links.push({
										store_name: 'iBooks',
										link: book['ibooks_product_url']
									})
								}

								if(book['play_store_product_url'] != null){
									book_obj.store_links.push({
										store_name: 'Play Store',
										link: book['play_store_product_url']
									})
								}

								this.books.books.push(book_obj)
							}
						}).then(()=> {
							//Generate a page of 5 books to be used by the caller
							generate_page(observer)
						}).catch((data)=>{
							observer.onError(data);
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