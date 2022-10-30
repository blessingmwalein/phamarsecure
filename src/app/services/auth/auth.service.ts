import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}auth/login`, credentials);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}auth/profile`);
  }

  //get roles
  getRoles() {
    return this.http.get(`${this.baseUrl}auth/get-roles`);
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}auth/get-users`);
  }

  //create role
  createRole(role) {
    return this.http.post(`${this.baseUrl}auth/create-role`, role);
  }

  deleteRole(id) {
    return this.http.delete(`${this.baseUrl}auth/delete-role/${id}`);
  }

  updateRole(id,role) {
    return this.http.patch(`${this.baseUrl}auth/update-role/${id}`, role);
  }


  //create user
  createUser(user) {
    return this.http.post(`${this.baseUrl}auth/register`, user);
  }


  //assign role
  assignRole(role) {
    return this.http.post(`${this.baseUrl}auth/assign-role`, role);
  }



  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl("auth/login");
  }

  setAuthDetails(details) {
    sessionStorage.setItem("cred", JSON.stringify(details));
  }

  setToken(token) {
    sessionStorage.setItem("token", token);
  }

  getAuthDetails(): User {
    return JSON.parse(sessionStorage.getItem("cred"));
  }
  getToken() {
    return sessionStorage.getItem("token");
  }

  isAuthenticated() {
    var cred = this.getToken();
    console.log(cred);
    if (!cred || cred === null) {
      return false;
    }
    return true;
  }

  isSuperAdmin() {
    var cred = this.getAuthDetails();
    //chek if user is super admin
    if (cred.role.name === "Manager") {
      return true;
    }
    return false;
  }


}
