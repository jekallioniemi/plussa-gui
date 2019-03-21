import { Component, OnInit, ViewChild } from '@angular/core';
import { GitlabRestService } from '../gitlab-rest/gitlab-rest.service';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @ViewChild(EditorComponent)
  private editor: EditorComponent;
  private credentials = {
    accessToken: "zhTide4FLViFeUXgZf_D",
    projectId: "11077015"
  }
  // Repository: https://course-gitlab.tut.fi/pervasive_computing/plusgui-test
  // ID: 5012
  // token: zfPH8_Npjw419qkqgCu5

  private editedFileJSON: {};
  private fileTree = [];
  private courseName = "Course files";
  private fileListing = [];
  private path = "";



  constructor(private gitlabRestService: GitlabRestService) { }

  ngOnInit() { }

  downloadCourse() {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId)
    .subscribe((response) => {
      this.showCourseFiles(response);
      console.log(response);
    });
  }

  openFolder(fileMetaJSON) {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId, fileMetaJSON)
    .subscribe((response) => {
      this.showCourseFiles(response);
      console.log(response);
    });
  }

  downloadFile(fileMetaJSON) {
    // if file is folder openFolder else openFile to editor
    if(fileMetaJSON.type == "tree"){
      this.openFolder(fileMetaJSON);
    }
    else {
      this.gitlabRestService.getRepositoryFile(this.credentials.accessToken, this.credentials.projectId, fileMetaJSON)
      .subscribe((response) => {
        this.editor.setText(this.gitlabRestService.getFileDataFromJSON(response));
        console.log(response);
      });
      this.editedFileJSON = fileMetaJSON;
    }
  }
// add ?recursive=true to the rest service call for recursive file listing
  showCourseFiles(fileTreeJSON) {
    // TODO: generate UL-list structure from fileTreeJSON.
    this.fileTree = fileTreeJSON;
    this.fileListing = fileTreeJSON;
  }

  // Demo does a straight commit. This should just save the edited content into a data structure.
  saveEdits() {
    this.gitlabRestService.postRepositoryCommit(
      this.credentials.accessToken, this.credentials.projectId,
      this.fileTree, this.editedFileJSON, this.editor.getText())
    .subscribe((response) => {
      console.log(response);
    });
  }
}
