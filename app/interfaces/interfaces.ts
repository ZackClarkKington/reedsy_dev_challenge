namespace BooksApp.interfaces {
	export interface Book {
		title: string;
		author: string;
		published: string;
		rating: number;
		isbn: string;
	}

	export interface BookList {
		books: Book[];
		pageNum: number;
		moreBooks: boolean;
	}
}