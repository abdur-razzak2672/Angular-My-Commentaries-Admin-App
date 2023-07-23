import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http:HttpClient) {}
  url = 'http://localhost:3000/post';

  getAllPost(page:number,pageLimit:number):Observable<Post[]>{
 
     return this.http.get<Post[]>(this.url+"?_sort=id&_order=desc"+`&_page=${page}&_limit=${pageLimit}`);

 }

 getPostList():Observable<Post[]>{
 
     return this.http.get<Post[]>(this.url+"?_sort=id&_order=desc");

 }
  addPostData(data:any){
    return this.http.post(this.url,data);
  }

  deletePostData(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }


  updatePostData(data:any,id:number){
    return this.http.put(`${this.url}/${id}/`,data);
  }

  PostDetail(id:number){
    return this.http.get(`${this.url}/${id}`);
  }
}
