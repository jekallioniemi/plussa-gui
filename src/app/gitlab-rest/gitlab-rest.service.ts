import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitlabRestService {

  private projectsApiUrl = "https://gitlab.com/api/v4/projects/";
  private fileTreeExtensionUrl = "/repository/tree";
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  commitToCourseRepo(payload) {

  }

  getRepositoryTree(token, projectId) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId + this.fileTreeExtensionUrl, {headers});
  }

  getRepositoryFile(token, projectId, fileId) {

  }
}
