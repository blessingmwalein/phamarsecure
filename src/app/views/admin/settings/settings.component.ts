import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
  roles: any;
  user:User;
  userForm: FormGroup;

  constructor(private authServices: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getRoles();
    this.user = this.authServices.getAuthDetails();
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      roleId:["", Validators.required],
    });

    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      roleId: this.user.role.id,
    });
  }

  getRoles() {
    this.authServices.getRoles().subscribe(
      (data: any) => {
        this.roles = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
