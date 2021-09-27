import { Component } from '@angular/core';

import { DashboardComponent } from '../dashboard/dashboard.component';
declare const myTest: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ,'./sb-admin-2.css']
})
export class AppComponent {
  title = 'gamezone';
  onClick() {
    myTest();
  }
}


