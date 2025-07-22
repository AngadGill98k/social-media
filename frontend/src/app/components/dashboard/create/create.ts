import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']
})
export class Create {
  content: string = '';





 getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }


  submitPost() {

  const csrfToken = this.getCookie('XSRF-TOKEN');
    console.log('Submitted Post:', this.content);
    fetch('http://localhost:8000/new_post', {
    method: 'POST',
    body: JSON.stringify({ post_msg:this.content }),
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log(data.message);
        console.log(data)
      } else {
        console.log(data.msg);
      }
    });
  }
}
