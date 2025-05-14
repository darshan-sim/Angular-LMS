import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PostsService } from '../shared/service/posts.service';

export const canAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const postsService = inject(PostsService);
  const router = inject(Router);

  // Check if user is logged in
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // For post edit routes, check if the user is the owner
  if (state.url.includes('/post/edit')) {
    const postId = route.queryParams['id'];
    if (postId) {
      // Make sure posts are loaded
      const post = postsService.allPosts().find((p) => p.id === postId);
      if (post) {
        // Check if current user is the post author
        if (post.userId.toString() !== authService.user()?.id) {
          router.navigate(['/user/post'], { queryParams: { id: postId } });
          return false;
        }
      }
    }
  }

  return true;
};
