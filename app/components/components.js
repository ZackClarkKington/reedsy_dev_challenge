var BooksApp;
(function (BooksApp) {
    var components;
    (function (components) {
        var BookComponent = /** @class */ (function () {
            function BookComponent() {
                this.templateUrl = "components/book.component.html";
                this.controller = "BookController";
                this.bindings = {
                    data: '<'
                };
                this.controllerAs = "controller";
            }
            return BookComponent;
        }());
        var BookComponentController = /** @class */ (function () {
            function BookComponentController($scope, $http) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                var g_books_api_key = 'AIzaSyAFsx1jkjBeUI-e_ATkDo4J7w_LMUCw_rI';
                $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + this.data.isbn + '&key=' + g_books_api_key)
                    .then(function (response) {
                    if (response.data['totalItems'] > 0) {
                        _this.data.rating = response.data['items'][0]['volumeInfo']['averageRating'];
                    }
                });
            }
            return BookComponentController;
        }());
        var popular_books = angular.module('books').component("book", new BookComponent());
        popular_books.controller('BookController', BookComponentController);
    })(components = BooksApp.components || (BooksApp.components = {}));
})(BooksApp || (BooksApp = {}));
//# sourceMappingURL=components.js.map