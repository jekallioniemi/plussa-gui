import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-new-file',
  templateUrl: './create-new-file.component.html',
  styleUrls: ['./create-new-file.component.css']
})
export class CreateNewFileComponent implements OnInit {
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createNewFile("RaRxeNYUmr2zr_gJAQJh","5012","kissa.rst")
    .subscribe((response) => {
      console.log(response);
    });
  }
  createNewFile(token, projectId, file_path){
    const data = this.generateCommitData();
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.post("https://course-gitlab.tut.fi/api/v4/projects/" + projectId + "/repository/files/" + file_path, data, {headers});

  }
  private generateCommitData() {
    const data = {
      author_name: "Joonas Kaartoluoma",
      author_email: "joonas.kaartoluoma@student.tut.fi",
      branch: "testi",
      commit_message: "testCommit - timestamp: "+Date(),
      content: "New file",
    }
    return data;
  }
}
