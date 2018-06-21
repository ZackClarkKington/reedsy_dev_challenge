namespace BooksApp.interfaces {
	export interface Book {
		title: string;
		author: string;
		published: string;
		rating: number;
		isbn: string;
		store_links: Store[];
		thumbnail: string;
		description: string;
	}

	export interface BookList {
		books: Book[];
		pageNum: number;
		moreBooks: boolean;
	}

	export interface Store {
		store_name: string;
		link: string;
	}
}