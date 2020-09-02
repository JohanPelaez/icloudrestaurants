import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKitchenComponent } from './new-kitchen.component';

describe('NewKitchenComponent', () => {
  let component: NewKitchenComponent;
  let fixture: ComponentFixture<NewKitchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewKitchenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
