import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';
import { RegistertermsComponent } from './registerterms/registerterms.component';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs'
import { map, startWith} from 'rxjs/operators';
import { STATES, State } from '../../models/states';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public errors: any = [];
  public states: State[] = STATES;
  public filteredStates: Observable<State[]>;
  user: User; 
  topPosition: MatSnackBarVerticalPosition = 'top';
  rightPosition: MatSnackBarHorizontalPosition = 'right';
  error = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}
  phonePattern = '^[0-9]{3}-[0-9]{3}-[0-9]{4}?$';
  zipPattern = '^[0-9]{5}(?:-[0-9]{4})?$';

  ngOnInit() {
    this.registerForm = this.fb.group({
      userGroup: this.fb.group({
        firstName: ['', [Validators.required, Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.maxLength(50)]],
        dob: ['', [Validators.required]],
        phone: ['', [Validators.pattern(this.phonePattern)]],
      }),
      addressGroup: this.fb.group({
        address: ['', [Validators.required, Validators.maxLength(100)]],
        city: ['', [Validators.required, Validators.maxLength(50)]],
        state: ['', [Validators.required, Validators.maxLength(50)]],
        zip: ['', [Validators.pattern(this.zipPattern)]],
      }),
      loginGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
          password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
        },
        {
          validator: this.checkPasswords('password', 'confirmPassword'),
        }
      )
    });

    this.filteredStates = this.registerForm.get('addressGroup').get('state').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
    );
  }

  // Validate the password and confirm password fields
  checkPasswords(passwordField: string, confirmPasswordField: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordField];
      const confirmPassword = group.controls[confirmPasswordField];

      if (password.value !== confirmPassword.value) {
        return confirmPassword.setErrors({ notEqual: true });
      } else {
        return confirmPassword.setErrors(null);
      }
    };
  }

  onSubmit() {
    // Call registration service here
    this.authenticationService.register(
      this.registerForm.get('loginGroup').get('email').value,
      this.registerForm.get('loginGroup').get('email').value,
      this.registerForm.get('loginGroup').get('password').value,
      this.registerForm.get('userGroup').get('firstName').value,
      this.registerForm.get('userGroup').get('lastName').value,
      this.registerForm.get('userGroup').get('dob').value,
      this.registerForm.get('addressGroup').get('address').value,
      this.registerForm.get('addressGroup').get('city').value,
      this.registerForm.get('addressGroup').get('state').value,
      this.registerForm.get('addressGroup').get('zip').value,
      this.registerForm.get('userGroup').get('phone').value, '')
      .pipe(first())
      .subscribe(
        user => {
          this.snackBar.open('Registration Successful', 'X', {
            duration: 4000,
            verticalPosition: this.topPosition,
            horizontalPosition: this.rightPosition
          });

          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
        }
      );
  }

  // Get validation error message
  getErrorMessage(groupName: string, controlName: string) {
    return this.registerForm
      .get(groupName)
      .get(controlName)
      .hasError('required')
      ? 'You must enter a value'
      : this.registerForm
          .get(groupName)
          .get(controlName)
          .hasError('email')
      ? 'Not a valid email'
      : this.registerForm
          .get(groupName)
          .get(controlName)
          .hasError('notEqual')
      ? 'Passwords do not match'
      : this.registerForm
          .get(groupName)
          .get(controlName)
          .hasError('minlength')
      ? 'Too short'
      : this.registerForm
          .get(groupName)
          .get(controlName)
          .hasError('maxlength')
      ? 'Too long'
      : '';
  }

  openTermsDialog() {
    // Open the dialog that contants the terms of use policy
    const dialogRef = this.dialog.open(RegistertermsComponent);
  }

  private _filter(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }
}
