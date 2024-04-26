import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCalendrierComponent } from './list-calendrier.component';

describe('ListConstantComponent', () => {
  let component: ListCalendrierComponent;
  let fixture: ComponentFixture<ListCalendrierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCalendrierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
