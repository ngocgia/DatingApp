import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
 @Input() comments!: Comment[];
  constructor(private commentService : CommentService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    
  }

 
}
