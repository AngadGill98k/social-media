import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  username: String = ''
  mail: String = ''
  password: String = ''

  username1: String = ''
  mail1: String = ''
  password1: String = ''

  ngOnInit(): void {
    this.fetchCsrfToken();
  }

  fetchCsrfToken() {
   fetch('http://localhost:8000/sanctum/csrf-cookie', {
  method: 'GET',
  credentials: 'include'
})

      .then(() => {
        const token = this.getCookie('XSRF-TOKEN');
        if (!token) {
          console.error('CSRF token not found');
        } else {
          console.log('CSRF token loaded:', token);
        }
      })
      .catch(err => {
        console.error('Failed to fetch CSRF token:', err);
      });
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
handleSignin() {
  let name = this.username;
  let pass = this.password;
  let email = this.mail;

  const csrfToken = this.getCookie('XSRF-TOKEN');

  fetch('http://localhost:8000/signin', {
    method: 'POST',
    body: JSON.stringify({ name, pass, email }),
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log('Successful login', name, pass, email);
      } else {
        console.log('Login failed:', data);
      }
    });
}



handleSignup() {
  let name = this.username1;
  let pass = this.password1;
  let email = this.mail1;

  const csrfToken = this.getCookie('XSRF-TOKEN');

  fetch('http://localhost:8000/signup', {
    method: 'POST',
    body: JSON.stringify({ name, pass, email }),
    headers: {
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log('Successfully registered', name, pass, email);
      } else {
        console.log('Signup failed:', data);
      }
    });
}


}
