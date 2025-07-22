import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Left } from './components/left/left';
import { msg } from './models/msg';
import { Navbar } from "./components/navbar/navbar";
import { Middle } from "./components/middle/middle";
import { Right } from "./components/right/right";
import { Login } from "./components/login/login";
import { Dashboard } from "./components/dashboard/dashboard";
import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Left, Navbar, Middle, Right, Login, Dashboard,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  static chatroom_id:String=''
  static msg:Array<msg>=[]
  protected readonly title = signal('frontend');
  static socket: Socket;
  static userid:string=''
  
 ngOnInit(): void {
  
  fetch('http://localhost:8000/current_user', {
  method: 'GET',
  credentials: 'include' // Important for cookies/session
})
.then(res => res.json())
.then(data => {
  if (data.msg) {
    console.log('User ID:', data.id);
    App.userid=data.id;
  } else {
    console.error('User not logged in');
  }
});
  if (!App.socket) {
    App.socket = io('http://localhost:3001'); // ✅ correct
    console.log('Socket initialized');
  }
}
hasChatroom(): boolean {
  return !!App.chatroom_id; // returns true if not empty
}



}
