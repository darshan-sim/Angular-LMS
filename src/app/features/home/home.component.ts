import { Component, inject, OnInit } from '@angular/core';
import { PostComponent } from '../../shared/components/post/post.component';
import { PostsService } from '../../shared/service/posts.service';
import {ScrollingModule} from '@angular/cdk/scrolling'

@Component({
  selector: 'app-home',
  imports: [PostComponent, ScrollingModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  postsService = inject(PostsService);
  allPosts = this.postsService.allPosts;
  ngOnInit(): void {
    this.postsService.reset();
    this.postsService.loadNextPage();
    console.log(this.allPosts())
  }

  onScrolledIndexChange(index: number) {
    const buffer = 2;
    const total = this.allPosts().length;
    if (index + buffer >= total && this.postsService.hasMore()) {
      this.postsService.loadNextPage();
    }
  }
}
