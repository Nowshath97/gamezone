function myTest() {
    alert('Welcome to custom java script');
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

function gitTest() {
    alert('Welcome to GIT testing');
}

$(function() {
    alert('Hello, custom git commit');
});