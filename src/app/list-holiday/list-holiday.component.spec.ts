import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHolidayComponent } from './list-holiday.component';

describe('ListRegimComponent', () => {
  let component: ListHolidayComponent;
  let fixture: ComponentFixture<ListHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHolidayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
