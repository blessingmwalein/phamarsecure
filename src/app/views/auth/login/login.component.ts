import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  //create form group
  //create form builder
  //create form control
  //create form array
  //create form group
  loginForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  //create function to login
  submitForm() {
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (data: any) => {
        this.authService.setToken(data.access_token);
        this.authService.getProfile().subscribe(
          (profile: any) => {
            this.authService.setAuthDetails(profile);
            this.loading = false;
            this.router.navigateByUrl("admin/dashboard");
          },
          (error) => {
            this.loading = false;
            this.errorMessage = "Failed to get profile";
          }
        );
      },
      (error) => {
        this.loading = false;
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
