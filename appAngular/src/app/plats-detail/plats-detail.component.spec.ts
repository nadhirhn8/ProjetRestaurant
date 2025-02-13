import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsDetailComponent } from './plats-detail.component';

describe('PlatsDetailComponent', () => {
  let component: PlatsDetailComponent;
  let fixture: ComponentFixture<PlatsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
