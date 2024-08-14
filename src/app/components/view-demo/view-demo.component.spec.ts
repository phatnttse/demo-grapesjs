import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDemoComponent } from './view-demo.component';

describe('ViewDemoComponent', () => {
  let component: ViewDemoComponent;
  let fixture: ComponentFixture<ViewDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
