'use strict';

describe('books module', function(){
	beforeEach(module('books'));

	it('sets books view controller', inject(function($controller){
		var ViewController = $controller('ViewController');
		expect(ViewController).toBeDefined();
	}));
});