import { Component, OnInit, ViewChild } from '@angular/core';
import { GitlabRestService } from '../gitlab-rest/gitlab-rest.service';
import { EditorComponent } from '../editor/editor.component';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @ViewChild(EditorComponent) editor: EditorComponent
  @ViewChild('tree') tree: TreeComponent
  //private editor: EditorComponent;
  private credentials = {
    accessToken: "zhTide4FLViFeUXgZf_D",
    projectId: "11077015"
  }
  // Repository: https://course-gitlab.tut.fi/pervasive_computing/plusgui-test
  // ID: 5012
  // token: zfPH8_Npjw419qkqgCu5

  private editedFileJSON: {};
  private courseName = "Course files";
  private origFileTreeJSON;
  private fileTree;
  private path = "";
  private project: any;


  constructor(private gitlabRestService: GitlabRestService) { }

  ngOnInit() {/*
    var testJSON = [{"id":"7de5841695b4d2f5b3fe77fe90a08f27939b3d21","name":"e2e","type":"tree","path":"e2e","mode":"040000"},{"id":"0b91aec856671e1603bc0a5a5832046448d087cf","name":"src","type":"tree","path":"src","mode":"040000"},{"id":"e89330a618c137cdaccde46f87923736cc04dfb4","name":".editorconfig","type":"blob","path":".editorconfig","mode":"100644"},{"id":"f4f46a5feeb99832da5739425488cf171397a413","name":".gitignore","type":"blob","path":".gitignore","mode":"100644"},{"id":"f38139835caca98862b249d26deeacde060390fb","name":"README.md","type":"blob","path":"README.md","mode":"100644"},{"id":"b9fbd71c3639ac673ebb57836ace4aa7a7d636d2","name":"angular.json","type":"blob","path":"angular.json","mode":"100644"},{"id":"ca225b0f4ac8b54dd99a1682e1efea293a69e07d","name":"package-lock.json","type":"blob","path":"package-lock.json","mode":"100644"},{"id":"e0b2c3be41dcfdbc171fb18ae2a10cdc6d78bc55","name":"package.json","type":"blob","path":"package.json","mode":"100644"},{"id":"89fa1fe3389993410784230a8a65afa174ad933b","name":"testi.txt","type":"blob","path":"testi.txt","mode":"100644"},{"id":"b271fd9f3d55adf81bfd0da7d83de3eb88b7e191","name":"tsconfig.json","type":"blob","path":"tsconfig.json","mode":"100644"},{"id":"868ecba0db1b781aa74d9c7a5247a1cd567f4b0e","name":"tslint.json","type":"blob","path":"tslint.json","mode":"100644"}];
    this.showCourseFiles(testJSON);*/
  }

  /*
   * Filetree node event handler
   * $event.node.data holds the clicked file meta data JSON
   */
  onEvent = function($event) {
    // blob types are files to be downloaded
    if($event.node.data.type == "blob") {
      this.downloadFile($event.node.data);
    }
    // tree types are folders to be opened when event name is "activate"
    else if($event.node.data.type == "tree" && $event.eventName == "activate"){
      console.log($event.node.data.children[0]);
      // Load folder contents only if they are not already loaded (check for a nameless child node)
      if($event.node.data.children[0].name == undefined) {
        this.openFolder($event.node.data);
      }
    }
  }

  appendBranchToFileTree(parentId, travelJSON, branchJSON) {
    let l = travelJSON.length;
    for(let i = 0; i < l; ++i) {
      if(travelJSON[i].type == 'tree') {
        if(travelJSON[i].id == parentId) {
          travelJSON[i].children = branchJSON;
        }
        else {
          this.appendBranchToFileTree(parentId, travelJSON[i], branchJSON);
        }
      }
    }
  }

  downloadCourse() {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId)
    .subscribe((response) => {
      this.showCourseFiles(response);
      this.origFileTreeJSON = response;
      console.log(response);
    });

    this.gitlabRestService.getProject(this.credentials.accessToken, this.credentials.projectId)
    .subscribe((response) => {
      this.project = response;
    });
  }

  openFolder(fileMetaJSON) {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId, fileMetaJSON)
    .subscribe((response) => {
      // TODO: Generate child nodes for the appropriate node in fileNodes structure
      // https://angular2-tree.readme.io/docs/
      this.appendBranchToFileTree(fileMetaJSON.id, this.fileTree, response);
      console.log(JSON.stringify(response));
      this.tree.treeModel.focusDrillDown();
      this.tree.treeModel.update();
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

  /* Angular Tree Component https://angular2-tree.readme.io/docs/
   * handles the file tree presentation.
   */
  showCourseFiles(fileTreeJSON) {
    var l = fileTreeJSON.length;
    // Add empty child node to tree types to have folder icons presented
    for(var i = 0; i < l; i++) {
      if(fileTreeJSON[i].type == "tree") {
        fileTreeJSON[i].children = [{}];
      }
    }
    this.fileTree = fileTreeJSON;
    console.log(JSON.stringify(fileTreeJSON));
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
