function dashboardController(mainSvc){
    var vm = this;

    mainSvc.getPosts().then(function(response){

        vm.posts = response.data;
    })
}

app.component('dashboard',{

    templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']


})