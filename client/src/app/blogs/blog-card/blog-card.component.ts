import { Component, Input, OnInit } from '@angular/core';
import { Blogs } from 'src/app/_models/blog';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() blog!: Blogs;
  constructor() { }

  ngOnInit(): void {
  }

}
