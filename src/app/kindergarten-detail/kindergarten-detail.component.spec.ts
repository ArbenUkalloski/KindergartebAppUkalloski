import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergartenDetailComponent } from './kindergarten-detail.component';

describe('KindergartenDetailComponent', () => {
  let component: KindergartenDetailComponent;
  let fixture: ComponentFixture<KindergartenDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergartenDetailComponent]
    });
    fixture = TestBed.createComponent(KindergartenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
