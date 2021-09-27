function myTest() {
    alert('Welcome to custom js');
}

$(function() {
    alert('Hello, custom js');
});


var app = angular.module("app", []);

app.controller('exampleController', [function() {
  this.myFunction = function() {
    alert("Iam from angular controller");
  }
}]);

function myFunction() {
  alert("Iam from javascript");
}