import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { createPopper } from "@popperjs/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.css"],
})
export class RolesComponent implements OnInit {
  roles: any;
  roleForm: FormGroup;
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
    this.getRoles();
    this.roleForm = this.fb.group({
      name: ["", Validators.required],
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

  showModal = false;
  isEdit = false;
  role: any;
  loading = false;

  toggleModal(isEdit, role: any) {
    this.isEdit = isEdit;
    this.showModal = !this.showModal;
    if (isEdit) {
      this.roleForm.patchValue({
        name: role.name,
      });
      this.role = role;

      console.log(this.role);
    }
  }

  submitForm() {
    this.loading = true;
    if (this.isEdit) {
      this.authServices.updateRole(this.role.id, this.roleForm.value).subscribe(
        (data: any) => {
          this.getRoles();
          this.showModal = false;
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    } else {
      this.authServices.createRole(this.roleForm.value).subscribe(
        (data: any) => {
          this.getRoles();
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
