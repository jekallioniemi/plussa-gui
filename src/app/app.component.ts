import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  title = 'plussa-gui';
  response: any;

  constructor(
    private http:HttpClient
  ){}

  ngOnInit(){
    this.get();
  }

  get(){

    // GitLab private token
    var token = "zhTide4FLViFeUXgZf_D";
    // GitLab API URL split into variables
    var apiUrl = "https://gitlab.com/api/v4/projects/";
    var projectId = "11077015";
    var filePath = "/repository/files/testi.txt?ref=master";

    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    this.http.get(apiUrl + projectId + filePath, {headers})
    .subscribe((response) => {
      this.response = response;
      console.log(this.response);
    });
  }

}
