import { Component, inject, OnInit, signal } from '@angular/core';
import { PostDTO } from '../../shared/models/post';
import { HomeService } from './home.service';
import { PostComponent } from "../../shared/components/post/post.component";

@Component({
  selector: 'app-home',
  imports: [PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  allPosts = signal<PostDTO[]>([]);

  homeService = inject(HomeService);

  ngOnInit(): void {
    this.homeService.getAllPost().subscribe({
      next: (posts) => this.allPosts.set(posts),
    });
  }
}
