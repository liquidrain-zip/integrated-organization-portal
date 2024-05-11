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
  selector: 'app-input-field-name',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field-name.component.html',
  styleUrl: './input-field-name.component.css',
})
export class InputFieldNameComponent {
  name = new FormControl('', [Validators.required, Validators.nullValidator]);
  errorMessage = '';
  onValueChange = output<string>();

  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.updateErrorMessage(this.name);
      });
  }

  updateErrorMessage(name: FormControl) {
    if (name.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    } else if (name.hasError('name')) {
      this.errorMessage = 'Not a valid name';
    } else {
      this.onValueChange.emit(name.value);
      this.errorMessage = '';
    }
  }
}
