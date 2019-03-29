import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFileComponent } from './create-new-file.component';

describe('CreateNewFileComponent', () => {
  let component: CreateNewFileComponent;
  let fixture: ComponentFixture<CreateNewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
