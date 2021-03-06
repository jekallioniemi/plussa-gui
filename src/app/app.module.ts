import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { TreeModule } from 'angular-tree-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GitlabRestService } from './gitlab-rest/gitlab-rest.service';
import { EditorComponent } from './editor/editor.component';
import { CourseComponent } from './course/course.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    CourseComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TreeModule.forRoot()
  ],
  providers: [GitlabRestService, EditorComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
