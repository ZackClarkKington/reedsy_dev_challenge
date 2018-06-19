var BooksApp;
(function (BooksApp) {
    var app = angular.module('books', []);
    var AppController = /** @class */ (function () {
        function AppController($scope, $http) {
            var _this = this;
            this.$scope = $scope;
            this.$http = $http;
            this.books = {
                books: [],
                moreBooks: false,
                pageNum: 0
            };
            $http.get('https://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=afe357b7d35a401f8e8e69da6cb13c3b')
                .then(function (response) {
                var bestsellers = response.data;
                for (var index in bestsellers['results']) {
                    var book_details = bestsellers['results'][index]['book_details'][0];
                    console.log(book_details);
                    _this.books.books.push({
                        title: book_details['title'],
                        author: book_details['author'],
                        published: new Date(),
                        rating: 0,
                        isbn: book_details['primary_isbn10']
                    });
                }
                $scope.books = _this.books.books;
            });
        }
        return AppController;
    }());
    app.controller('ViewController', AppController);
})(BooksApp || (BooksApp = {}));
//# sourceMappingURL=app.js.map