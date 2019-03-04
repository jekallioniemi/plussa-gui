import { TestBed } from '@angular/core/testing';

import { GitlabRestService } from './gitlab-rest.service';

describe('GitlabRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitlabRestService = TestBed.get(GitlabRestService);
    expect(service).toBeTruthy();
  });
});
