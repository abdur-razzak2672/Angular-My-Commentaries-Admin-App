import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

 
  constructor(private http:HttpClient) {}
  url = 'http://localhost:3000/category';

  getAllCategory(page:number,pageLimit:number):Observable<Category[]>{
  //  return this.http.get<Category[]>(this.url+"?_sort=id&_order=desc"+'&page=7&_limit=7');

     return this.http.get<Category[]>(this.url+"?_sort=id&_order=desc"+`&_page=${page}&_limit=${pageLimit}`);

 }
  addCategoryData(data:Category){
    return this.http.post(this.url,data);
  }

  deleteCategoryData(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }


  updateCategoryData(data:Category,id:number){
    return this.http.put(`${this.url}/${id}/`,data);
  }

  CategoryDetail(id:number){
    return this.http.get(`${this.url}/${id}`);
  }
}
