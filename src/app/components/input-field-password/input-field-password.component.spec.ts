import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldPasswordComponent } from './input-field-password.component';

describe('InputFieldPasswordComponent', () => {
  let component: InputFieldPasswordComponent;
  let fixture: ComponentFixture<InputFieldPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputFieldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
