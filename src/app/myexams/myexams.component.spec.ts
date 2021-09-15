import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyexamsComponent } from './myexams.component';

describe('MyexamsComponent', () => {
  let component: MyexamsComponent;
  let fixture: ComponentFixture<MyexamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyexamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyexamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
