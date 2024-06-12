import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paie } from './paie.component';

describe('ListConstantComponent', () => {
  let component: Paie;
  let fixture: ComponentFixture<Paie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paie]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paie);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
