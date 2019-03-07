import { Component, OnInit } from '@angular/core';
import { GitlabRestService } from '../gitlab-rest/gitlab-rest.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  private credentials = {
    accessToken: "zhTide4FLViFeUXgZf_D",
    projectId: "11077015"
  }

  private files: any;
  private courseName = "Course files";
  private fileListing = "File listing...";


  constructor(private gitlabRestService: GitlabRestService) { }

  ngOnInit() { }

  downloadCourse() {
    this.gitlabRestService.getRepositoryTree(this.credentials.accessToken, this.credentials.projectId)
    .subscribe((response) => {
      this.showCourseFiles(response);
      console.log(response);
      this.files = response;
    });
  }

  downloadFile(fileId) {

  }
// add ?recursive=true to the rest service call for recursive file listing
  showCourseFiles(fileTreeJSON) {
    this.fileListing = JSON.stringify(fileTreeJSON);
  }
}
