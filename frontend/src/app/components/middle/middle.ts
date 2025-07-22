import { Component, OnInit } from '@angular/core';
import { posts } from '../../models/posts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-middle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './middle.html',
  styleUrls: ['./middle.css']
})
export class Middle implements OnInit {
  allData: any[] = [];

 posts: Array<posts> = [];

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }

  ngOnInit(): void {
    const csrfToken = this.getCookie('XSRF-TOKEN');

    fetch('http://localhost:8000/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
      },
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log('Data fetched:', data.post)
        console.log( data.msg)
        console.log(this.posts=data.post);
         
      } else {
        console.error('Fetch failed:', data);
        console.log( data.msg)
      }
    })
    .catch(err => console.error('Fetch error:', err));
  }
  toggleComments(post: posts) {
  post.showComments = !post.showComments;
}
}
