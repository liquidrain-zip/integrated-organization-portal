import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldNameComponent } from './input-field-name.component';

describe('InputFieldNameComponent', () => {
  let component: InputFieldNameComponent;
  let fixture: ComponentFixture<InputFieldNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFieldNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
