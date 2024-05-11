import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldEmailComponent } from './input-field-email.component';

describe('InputFieldComponent', () => {
  let component: InputFieldEmailComponent;
  let fixture: ComponentFixture<InputFieldEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFieldEmailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFieldEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
