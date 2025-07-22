import { Component, OnInit } from '@angular/core';
import { posts } from '../../../models/posts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  
 posts: Array<posts> = [];

    getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
  ngOnInit(): void {
     const csrfToken = this.getCookie('XSRF-TOKEN');
    fetch('http://localhost:8000/ret_post', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log(data.msg);
        
        this.posts=data.posts
        console.log(this.posts);
      } else {
        console.log(data.msg);
        console.log(data);
      }
    });
  }
toggleComments(post: posts) {
  post.showComments = !post.showComments;
}
}
