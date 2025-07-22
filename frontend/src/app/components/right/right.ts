import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io, Socket } from 'socket.io-client';
import { App } from '../../app';
import { msg } from '../../models/msg';

@Component({
  selector: 'app-right',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './right.html',
  styleUrl: './right.css'
})
export class Right implements OnInit {
  msg: string = '';
  socket: Socket=App.socket;
  msg2:Array<msg>=App.msg
  userid:String=App.userid
  ngOnInit(): void {
    if (App.chatroom_id) {
    this.socket.emit('join_room', App.chatroom_id);
    console.log('Joined room:', App.chatroom_id);
  }
this.socket.on('receive_message', (data) => {
  console.log('New message received:', data);
   this.msg2.push(data);
});

  
  }
  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
  handlesend(): void {
    if (!this.msg.trim()) return;

  
  const csrfToken = this.getCookie('XSRF-TOKEN');
    // Optionally save it to Laravel DB via fetch
    fetch('http://localhost:8000/save_msg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
           'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
      },
      credentials: 'include',
      body: JSON.stringify({msg:this.msg,chatroomid:App.chatroom_id})
    })
    .then(res => res.json())
    .then(data => {
      if (data.msg) {
        console.log("Message saved to DB");
        console.log(data);
      } else {
        console.log("Message save failed");
      }
    });

    this.msg = '';
  }
}
