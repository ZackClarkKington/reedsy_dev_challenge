namespace BooksApp.interfaces {
	export interface Book {
		title: String;
		author: String;
		published: Date;
		rating: Number;
		isbn: String;
	}

	export interface BookList {
		books: Book[];
		pageNum: Number;
		moreBooks: Boolean;
	}
}