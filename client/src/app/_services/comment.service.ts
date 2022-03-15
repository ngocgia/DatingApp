import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/comment';

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
}
