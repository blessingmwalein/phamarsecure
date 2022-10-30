import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  collapseShow = "hidden";
  isManager:boolean;
  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.isManager = this.authService.isSuperAdmin();
  }
  toggleCollapseShow(classes) {
    this.collapseShow = classes;
  }
}
