import { Component,OnInit } from '@angular/core';
import { dost } from '../../../models/dost';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';
import { Right } from '../../right/right';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {

  dosts: Array<dost> = [];
getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
  ngOnInit(): void {
    const csrfToken = this.getCookie('XSRF-TOKEN');
    this.dosts = [];
    fetch(`http://localhost:8000/ret_list`, {
      method: 'GET',
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.msg){
      console.log('list retrived ');
        this.dosts=data.list
        console.log(this.dosts)
      }else{
        console.log("failed to retrive")
      }
    }) 
  }

  join_room(dost:dost){
    
  const csrfToken = this.getCookie('XSRF-TOKEN');
  if (App.chatroom_id) {
    // Leave the previous room
    App.socket.emit('leave_room', App.chatroom_id); 
    console.log('Left room:', App.chatroom_id);
  }

     fetch(`http://localhost:8000/join_room`, {
      method: 'POST',
      body:JSON.stringify({id:dost.id}),
      headers: {
'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
      console.log('msg retrived');
      console.log(data)
        App.chatroom_id=data.chatroom_id
        App.msg=data.messages
        console.log("chatroom id is",App.chatroom_id , App.msg)
      }else{
        console.log("msg not retrive")
      }
    }) 
  }





}
