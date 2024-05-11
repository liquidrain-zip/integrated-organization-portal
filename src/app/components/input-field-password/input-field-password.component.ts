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
  selector: 'app-input-field-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field-password.component.html',
  styleUrl: './input-field-password.component.css',
})
export class InputFieldPasswordComponent {
  password = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  errorMessage = '';
  onValueChange = output<string>();

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage(this.password);
      });
  }

  updateErrorMessage(password: FormControl) {
    if (password.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (password.hasError('password')) {
      this.errorMessage = 'Not a valid password';
    } else {
      this.onValueChange.emit(password.value);
      this.errorMessage = '';
    }
  }
}
