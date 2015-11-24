 var miniStore = angular.module('miniStore', ['ngRoute', 'angularMoment']);

miniStore.config(function($routeProvider){
	$routeProvider
	.when('/dashboard', {
		templateUrl: '/partials/dashboard.html'
	})
	.when('/products', {
		templateUrl: '/partials/products.html'
	})
	.when('/customers', {
		templateUrl: '/partials/customers.html'
	})
	.when('/orders', {
		templateUrl: '/partials/orders.html'
	})
	.otherwise({
		redirectTo: '/customers'
	});
});
miniStore.factory("customerFactory", function($http){
	var factory = {};
	factory.getCustomers = function(callback){
		$http.get('/get_customers').success(function(customers){
			callback(customers);
		})
	}
	factory.addCustomer = function(info, callback){
		$http.post('/new_customer', info).success(function(){
			callback();
		})
	}
	factory.removeCustomer = function(name, callback){
		$http.delete('/remove_customer/' + name).success(function(){
			callback();
		})
	}
	return factory;
})
miniStore.controller('customerController', function($scope, customerFactory){
	$scope.getCustomers = function(){
		customerFactory.getCustomers(function(data){
			$scope.customers = data;
		})
	}
	$scope.getCustomers();
	$scope.addCustomer = function(){
		customerFactory.addCustomer({name : $scope.name}, $scope.getCustomers);
		$scope.name = '';
	}
	$scope.removeCustomer = function(name){
		customerFactory.removeCustomer(name, $scope.getCustomers);
	}
})
miniStore.factory('productFactory', function($http){
	var factory = {};
	factory.getProducts = function(callback){
		$http.get('/get_products').success(function(products){
			callback(products);
		})
	}
	factory.addProduct = function(info, callback){
		$http.post('/add_product', info).success(function(errors){
			callback(errors);
		})
	}
	return factory;
})
miniStore.controller('productController', function($scope, productFactory){
	$scope.getProducts = function(){
		productFactory.getProducts(function(data){
			for (var i = 0; i < data.length; i++){
				if (data[i].quantity == 0){
					data[i].quantity = 'Out of stock';
				} else {
					data[i].quantity = data[i].quantity + " left";
				}
			}
			$scope.products = data;
		})
	}
	$scope.getProducts();
	$scope.addProduct = function(){
		productFactory.addProduct($scope.product, function(errors){
			$scope.errors = errors;
			$scope.getProducts();
			$scope.product = '';
		})
	}
})
miniStore.controller('orderController', function($http, $scope, customerFactory, productFactory){
	$scope.getCustomers = function(){
		customerFactory.getCustomers(function(data){
			$scope.orders = [];
			$scope.customers = [];
			$scope.order_date = [];
			data.some(function(customer){
				$scope.customers.push({name : customer.name, id : customer._id});
				if (customer.order.length > 0){
					$scope.orders.push(customer);
					customer.order.some(function(order){
						order.name = customer.name;
						$scope.order_date.push(order);
					})
				}
			})
			$scope.customer = $scope.customers[0];
		})
	}
	$scope.getProducts = function(){
		productFactory.getProducts(function(data){
			$scope.items = [];
			for (var i = 0; i < data.length; i++) { 
				if (data[i].quantity != 0){
					$scope.items.push(data[i]);
				}
			};
			$scope.items.some(function(item){
				var temp = [];
				for (var i = 1; i <= item.quantity; i++){
					temp.push(i);
				}
				item.quantity = temp;
				$scope.quantity = item.quantity[0];
			})
			$scope.product = $scope.items[0];
		})
	}
	$scope.getCustomers();
	$scope.getProducts();
	$scope.addOrder = function(){
		$scope.newOrder = {id : $scope.customer.id, customer : $scope.customer.name, quantity : $scope.quantity, item : $scope.product.product, item_id : $scope.product._id};
		$http.put('/new_order', $scope.newOrder).success(function(){
			$scope.getCustomers();
			$scope.getProducts();
		})
	}
})