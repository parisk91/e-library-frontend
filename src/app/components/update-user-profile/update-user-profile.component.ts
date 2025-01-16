import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Role } from 'src/app/shared/interfaces/role';
import { User } from 'src/app/shared/interfaces/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-user-profile',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, RouterLink],
  templateUrl: './update-user-profile.component.html',
  styleUrl: './update-user-profile.component.css'
})
export class UpdateUserProfileComponent {
    userService = inject(UserService);
    
    router = inject(Router);
    route = inject(ActivatedRoute);
    
    user: User;
  
    roles: Role[] = [
      {value: 'USER', viewValue: 'USER'}
    ];
  
    form = new FormGroup ({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
      }, this.passwordConfirmValidator);
  
    passwordConfirmValidator(form: FormGroup) {
      if (form.get('password').value !== form.get('confirmPassword').value) {
        form.get('confirmPassword').setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
      return {};
    }
  
    ngOnInit(): void {
      const userId = this.route.snapshot.params['id'];
      this.userService.getUserById(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.form.patchValue({ username: user.username });
          this.form.patchValue({ password: "" });
          this.form.patchValue({ confirmPassword: "" });
          this.form.patchValue({ role: user.role });
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching user:', error.message);
        }
      });
    }
  
    updateUser() {
      if (this.form.valid) {
        const updateUser: User = {
          username: this.form.value.username,
          password: this.form.value.password,
          role: this.form.value.role,
          id: this.user.id,
          email: this.form.value.email
        };
        this.userService.updateUser(updateUser).subscribe({
          next: () => {
            console.log('User updates successfully');
              this.router.navigate(['/user-table']);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Error updating user:', error.message);
          }
        });
      }
    }
  
    goBack() {
        this.router.navigate(['/user-dashboard']);
    }
}
