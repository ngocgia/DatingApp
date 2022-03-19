import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blogs } from '../_models/blog';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + "admin/users-with-roles");
  }

  updateUserRoles(username: string, roles: string[]){
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  getPhotosForApproval() {
    return this.http.get<Photo[]>(this.baseUrl + 'admin/photos-to-moderate');
  }

  approvePhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/approve-photo/' + photoId, {});
  }

  rejectPhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/reject-photo/' + photoId, {});
  }
  getBlogsForApproval() {
    return this.http.get<Blogs[]>(this.baseUrl + 'admin/blogs-to-moderate');
  }

  approveBlog(blogId: number) {
    return this.http.post(this.baseUrl + 'admin/approve-blog/' + blogId, {});
  }

  rejectBlog(blogId: number) {
    return this.http.post(this.baseUrl + 'admin/reject-blog/' + blogId, {});
  }

  deleteUser(username: string){
    return this.http.delete(this.baseUrl + "admin/delete-user/" + username);
  }
}
