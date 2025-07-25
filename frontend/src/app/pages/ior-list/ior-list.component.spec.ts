import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IorListComponent } from './ior-list.component';

describe('IorListComponent', () => {
  let component: IorListComponent;
  let fixture: ComponentFixture<IorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
