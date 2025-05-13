import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from "../../shared/components/post/post.component";
import { PostsService } from '../../shared/service/posts.service';

@Component({
  selector: 'app-home',
  imports: [PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  
  postsService = inject(PostsService);
  allPosts = this.postsService.allPosts;

  ngOnInit(): void {
    this.postsService.loadPosts()
  }
}
