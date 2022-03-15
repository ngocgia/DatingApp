import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-system',
  templateUrl: './comment-system.component.html',
  styleUrls: ['./comment-system.component.css']
})
export class CommentSystemComponent implements OnInit {
  @Input() blogId!: number;
  comments : any | Comment;

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.loadAllComment();
  }

  loadAllComment(){
    console.log("LOAD COMMENT:",this.blogId);
    this.commentService.getAllComment(this.blogId).subscribe(comment => {
      this.comments = comment;
      console.log("load comment",comment);
    })
  }
}
