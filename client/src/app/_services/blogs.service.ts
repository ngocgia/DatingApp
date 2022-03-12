import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Blogs } from '../_models/blog';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  baseUrl = environment.apiUrl;
  blogs: Blogs[] = [];

  constructor(private http: HttpClient) { }

  getAllBlogs(pageNumber : number, pageSize: number) {
    let params = getPaginationHeaders(pageNumber, pageSize);
    return getPaginatedResult<Partial<Blogs[]>>(this.baseUrl + 'blogs', params, this.http);
  }

  getBlog(id: number){
    return this.http.get(this.baseUrl + 'blogs/' + id);
  }
  createBlog(models : Blogs){
    return this.http.post<Blogs>(this.baseUrl + "blogs", models);
  }
  
  updateBlog(blog: Blogs) {
    return this.http.put(this.baseUrl + 'blogs', blog).pipe(
      map(() =>{
        const index = this.blogs.indexOf(blog);
        this.blogs[index] = blog;
      })
    )
  }
  deleteBlog(id: number){
    return this.http.delete(this.baseUrl + 'blogs/' + id);
  }
}