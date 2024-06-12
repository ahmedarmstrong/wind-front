import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaieComponent } from './user-paie.component';

describe('UserPaieComponent', () => {
  let component: UserPaieComponent;
  let fixture: ComponentFixture<UserPaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPaieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
