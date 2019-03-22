import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitlabRestService {

  private httpHeaders: HttpHeaders;
  // URLs for GitLab API
  // course-gitlab.tut.fi projectsApiUrl: https://course-gitlab.tut.fi/api/v4/projects/
  private projectsApiUrl = "https://gitlab.com/api/v4/projects/";
  private filesExtensionUrl = "/repository/files"
  private fileTreeExtensionUrl = "/repository/tree";
  private commitExtensionUrl = "/repository/commits";
  

  constructor(private http: HttpClient) { }

  commitToCourseRepo(payload) {

  }

  getProject(token, projectId){
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId, {headers});
  }

  // Function to http.get repository filetree, ?per_page necessary when there is more than 20 files to show
  getRepositoryTree(token, projectId, fileMetaJSON?) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    if(fileMetaJSON == undefined){
      return this.http.get(this.projectsApiUrl + projectId + this.fileTreeExtensionUrl + "?per_page=100", {headers});
    }
    else{
      return this.http.get(this.projectsApiUrl + projectId + this.fileTreeExtensionUrl + "?path=" + fileMetaJSON.path, {headers});
    }
  }

  // change '/' to '%2F' for REST calls 
  replaceSlash(s:string) {
    return s && s.replace(/\//g,'%2F');
  }

  getRepositoryFile(token, projectId, fileMetaJSON) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId + this.filesExtensionUrl + "/" + this.replaceSlash(fileMetaJSON.path) + "?ref=master", {headers});
  }

  getFileDataFromJSON(fileJSON) {
    return atob(fileJSON.content);
  }

  postRepositoryCommit(token, projectId, fileTreeJSON, fileMetaJSON, newContent) {
    const payload = this.generateCommitPayload(projectId, fileMetaJSON, newContent);
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.post(this.projectsApiUrl + projectId + this.commitExtensionUrl, payload, {headers});
  }

  private generateCommitPayload(projectId, fileMetaJSON, newContent) {
    const payload = {
      id: projectId,
      branch: "master",
      commit_message: "testCommit - timestamp: "+Date(),
      actions: [
        {
          action: "update",
          file_path: fileMetaJSON.path,
          content: btoa(newContent),
          encoding: "base64"
        }
      ]
    }
    return payload;
  }
}
