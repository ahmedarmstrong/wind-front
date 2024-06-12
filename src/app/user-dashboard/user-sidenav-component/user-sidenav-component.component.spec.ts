import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSidenavComponentComponent } from './user-sidenav-component.component';

describe('UserSidenavComponentComponent', () => {
  let component: UserSidenavComponentComponent;
  let fixture: ComponentFixture<UserSidenavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSidenavComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSidenavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
