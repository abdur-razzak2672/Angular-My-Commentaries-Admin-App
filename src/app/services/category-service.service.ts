import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

 
  constructor(private http:HttpClient) {}
  url = 'http://localhost:3000/category';
  getAllCategory(){
   return this.http.get(this.url);
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
