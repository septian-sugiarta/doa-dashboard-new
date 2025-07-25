import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorViewComponent } from './ior-view.component';

describe('IorViewComponent', () => {
  let component: IorViewComponent;
  let fixture: ComponentFixture<IorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
