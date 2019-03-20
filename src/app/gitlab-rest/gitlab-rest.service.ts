import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GitlabRestService {

  private projectsApiUrl = "https://gitlab.com/api/v4/projects/";
  private filesExtensionUrl = "/repository/files"
  private fileTreeExtensionUrl = "/repository/tree";
  private commitExtensionUrl = "/repository/commits";
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) { }

  commitToCourseRepo(payload) {

  }

  getRepositoryTree(token, projectId) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId + this.fileTreeExtensionUrl, {headers});

  }
  getRepositoryTree2(token, projectId, fileMetaJSON) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId + this.fileTreeExtensionUrl + "?path=" + fileMetaJSON.path, {headers});

  }

  getRepositoryFile(token, projectId, fileMetaJSON) {
    const headers = new HttpHeaders().set("PRIVATE-TOKEN", token);
    return this.http.get(this.projectsApiUrl + projectId + this.filesExtensionUrl + "/" + fileMetaJSON.path + "?ref=master", {headers});
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
