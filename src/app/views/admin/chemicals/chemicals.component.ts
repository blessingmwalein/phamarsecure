import { Component, Input, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Chemical, Item } from "src/app/models/chemical";
import { User } from "src/app/models/user";
import { AuthService } from "src/app/services/auth/auth.service";
import { ChemicalsService } from "src/app/services/chemicals/chemicals.service";

@Component({
  selector: "app-chemicals",
  templateUrl: "./chemicals.component.html",
  styleUrls: ["./chemicals.component.css"],
})
export class ChemicalsComponent implements OnInit {
  roles: any;
  chemicals: Chemical[];
  // items:Item[];
  chemicalForm: FormGroup;
  searchForm: FormGroup;
  @Input()
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";

  constructor(
    private authServices: AuthService,
    private chemicalSevice: ChemicalsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getChemicals();
    this.isReseacrcher = this.authServices.isSuperAdmin();

    this.chemicalForm = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      timeline: new FormControl("", Validators.required),
      items: new FormArray([
        new FormGroup({
          name: new FormControl("", Validators.required),
          description: new FormControl("", Validators.required),
          qty: new FormControl("", Validators.required),
        }),
      ]),
    });

    this.searchForm = new FormGroup({
      query: new FormControl(""),
    });
  }

  //add item to form
  addItem() {
    // const control = <FormArray>this.chemicalForm.controls["items"];
    // console.log(control);
    const items = this.chemicalForm.get("items") as FormArray;
    items.push(
      new FormGroup({
        name: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        qty: new FormControl("", Validators.required),
      })
    );
  }
  //remove item from form
  removeItem(i: number) {
    const items = this.chemicalForm.get("items") as FormArray;
    items.removeAt(i);
  }

  submitSearchForm() {
    this.chemicalSevice
      .searchChemicals(this.searchForm.value)
      .subscribe((data: any) => {
        this.chemicals = data.chemicals;
      },(error) => {
        console.log(error);
      });
  }

  getChemicals() {
    this.chemicalSevice.getChemicals().subscribe(
      (data: any) => {
        this.chemicals = data.chemicals;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showModal = false;
  isEdit = false;
  chemical: Chemical;
  loading = false;

  isReseacrcher: boolean;

  toggleModal(isEdit, chemical: Chemical) {
    this.isEdit = isEdit;
    this.showModal = !this.showModal;
    if (isEdit) {
      this.chemicalForm.patchValue({
        name: chemical.name,
        description: chemical.description,
        timeline: chemical.timeline,
        //MAP ITEMS IN FORM
      });

      //clear items
      this.chemicalItemsForm.clear();
      const items = this.chemicalForm.get("items") as FormArray;

      chemical.items.forEach((item) => {
        items.push(
          new FormGroup({
            name: new FormControl(item.name, Validators.required),
            description: new FormControl(item.description, Validators.required),
            qty: new FormControl(item.qty, Validators.required),
            id: new FormControl(item.id),
          })
        );
      });

      console.log(this.chemicalItemsForm.value);
      this.chemical = chemical;
    }
  }

  get chemicalItemsForm(): FormArray {
    return this.chemicalForm.get("items") as FormArray;
  }

  submitForm() {
    this.loading = true;
    if (this.isEdit) {
      this.chemicalSevice
        .updateChemical(this.chemical.id, this.chemicalForm.value)
        .subscribe(
          (data: any) => {
            this.getChemicals();
            this.showModal = false;
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        );
    } else {
      this.chemicalSevice.createChemical(this.chemicalForm.value).subscribe(
        (data: any) => {
          this.getChemicals();
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

  get items() {
    return this.chemicalForm.get("items") as FormArray;
  }
}
