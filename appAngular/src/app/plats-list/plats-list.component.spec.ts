import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsListComponent } from './plats-list.component';

describe('PlatsListComponent', () => {
  let component: PlatsListComponent;
  let fixture: ComponentFixture<PlatsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
