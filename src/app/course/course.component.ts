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

  private credentials = {
    accessToken: "",
    projectId: ""
  }
  private editedFileJSON: {};
  private courseName = "Course files";
  private origFileTreeJSON;
  private fileTree;
  private path = "";

  constructor(private gitlabRestService: GitlabRestService) { }

  ngOnInit() { }

  /*
   * Filetree node event handler
   * $event.node.data holds the clicked file meta data JSON
   */
  onTreeClick = function($event) {
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

  /*
   * Filetree folder expand handler loads child nodes to repository tree types
   * if they have not been loaded by clicking the node name.
   * $event.node.data holds the expanded folder meta data JSON
   */
  onTreeExpand = function($event) {
    // Load folder files only if they are not already been loaded
    if($event.node.data.type == "tree" && $event.eventName == "toggleExpanded"){
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
