// import { Component, OnInit } from '@angular/core';
// import {
//   FormsModule,
//   ReactiveFormsModule,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { AccountService } from '../account.service';
// import { Router } from '@angular/router';
// import { TextInputComponent } from '../text-input/text-input.component';

// @Component({
//   selector: 'app-register',
//   imports: [TextInputComponent, FormsModule, ReactiveFormsModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent implements OnInit {
//   registerForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private accaountService: AccountService,
//     private router: Router,
//     private accountService: AccountService
//   ) {}

//   ngOnInit(): void {
//     this.createRegisterForm();
//   }

//   createRegisterForm() {
//     this.registerForm = this.fb.group({
//       dispalyName: [null, Validators.required],
//       email: [
//         null,
//         [
//           Validators.required,
//           Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
//         ],
//       ],
//       password: [null, [Validators.required]],
//     });
//   }

//   onSubmit() {
//     this.accountService.register(this.registerForm.value).subscribe(
//       () => {
//         this.router.navigateByUrl('/shop');
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }
// }

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { TextInputComponent } from '../text-input/text-input.component';
import { AccountService } from '../account.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    JsonPipe,
    MatError,
    TextInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(HotToastService);
  validationErrors?: string[];

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.toast.success('Registration successful - you can now login');
        this.router.navigateByUrl('/account/login');
      },
      error: (errors) => {
        this.validationErrors = errors['errors'];
        console.log(this.validationErrors);
        this.toast.error('Registration faild - please try again');
      },
    });
  }
}
