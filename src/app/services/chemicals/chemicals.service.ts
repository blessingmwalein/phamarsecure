import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChemicalsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  getChemicals() {
    return this.http.get(`${this.baseUrl}chemicals`);
  }

  getChemical(id) {
    return this.http.get(`${this.baseUrl}chemicals/${id}`);
  }

  createChemical(chemical) {
    return this.http.post(`${this.baseUrl}chemicals/create`, chemical);
  }

  updateChemical(id, chemical) {
    return this.http.patch(`${this.baseUrl}chemicals/${id}`, chemical);
  }

  deleteChemical(id) {
    return this.http.delete(`${this.baseUrl}chemicals/${id}`);
  }

  searchChemicals(search) {
    return this.http.post(`${this.baseUrl}chemicals/search/mix`, search);
  }
}
