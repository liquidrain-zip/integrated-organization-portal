import { Component, output } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-field-email',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field-email.component.html',
  styleUrl: './input-field-email.component.css',
})
export class InputFieldEmailComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  errorMessage = '';
  onValueChange = output<string>();

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage(this.email);
      });
  }

  updateErrorMessage(email: FormControl) {
    if (email.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (email.hasError('email')) {
      this.errorMessage = 'Not a valid email';
    } else {
      this.onValueChange.emit(email.value);
      this.errorMessage = '';
    }
  }
}
