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
  private editedFileJSON: {};
  private fileTree = [];
  private courseName = "Course files";
  private fileListing = [];



  constructor(private gitlabRestService: GitlabRestService) { }

  ngOnInit() { }

  downloadCourse() {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId)
    .subscribe((response) => {
      this.showCourseFiles(response);
      console.log(response);
    });
  }

  downloadFile(fileMetaJSON) {
    this.gitlabRestService.getRepositoryFile(this.credentials.accessToken, this.credentials.projectId, fileMetaJSON)
    .subscribe((response) => {
      this.editor.setText(this.gitlabRestService.getFileDataFromJSON(response));
      console.log(response);
    });
    this.editedFileJSON = fileMetaJSON;
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
