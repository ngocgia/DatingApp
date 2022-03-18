import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlogCommentCreate } from '../comments/models/blog-comment-create';
import { BlogComment } from '../comments/models/blog-comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = environment.apiUrl;
  comment: Comment[] = [];

  constructor(private http: HttpClient) { }

  getAllComment(blogsId: number){
    return this.http.get(this.baseUrl + "blogcomment/" + blogsId);
  }
  createComment(model: BlogCommentCreate){
    return this.http.post<BlogComment>(this.baseUrl + "blogcomment" , model);
  }

  deleteComment(blogCommentId: number){
    return this.http.delete(this.baseUrl + "blogcomment/" + blogCommentId);
  }
}
