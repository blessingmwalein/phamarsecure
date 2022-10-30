import { Component, Input, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  roles: any;
  users:User[];
  userForm: FormGroup;
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(private authServices: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required],
      roleId:["", Validators.required],
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
  getUsers() {
    this.authServices.getUsers().subscribe(
      (data: any) => {
        this.users = data;
        this.getRoles()
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showModal = false;
  isEdit = false;
  user: User;
  loading = false;

  toggleModal(isEdit, user: User) {
    this.isEdit = isEdit;
    this.showModal = !this.showModal;
    if (isEdit) {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: user.password,
        roleId: user.role.id,
      });
      this.user = user;
    }
  }

  submitForm() {
    this.loading = true;
    if (this.isEdit) {
      // this.authServices.updateRole(this.user.id, this.userForm.value).subscribe(
      //   (data: any) => {
      //     this.getRoles();
      //     this.showModal = false;
      //     this.loading = false;
      //   },
      //   (error) => {
      //     console.log(error);
      //     this.loading = false;
      //   }
      // );
    } else {
      this.authServices.createUser(this.userForm.value).subscribe(
        (data: any) => {
          this.getUsers();
          this.showModal = false;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }
}
