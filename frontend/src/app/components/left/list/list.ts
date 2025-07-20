import { Component,OnInit } from '@angular/core';
import { dost } from '../../../models/dost';
import { CommonModule } from '@angular/common';
import { App } from '../../../app';
@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List implements OnInit {

  dosts: Array<dost> = [];

  ngOnInit(): void {
    this.dosts = [
      {
        dost_name: 'Alice',
        dost_id: 'd1',
        chatroom_id: 'c1'
      },
      {
        dost_name: 'Bob',
        dost_id: 'd2',
        chatroom_id: 'c2'
      }
    ];
    fetch(``, {
      method: 'GET',
      headers: {

      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
      console.log('list retrived ');
        this.dosts=data.list
      }else{
        console.log("failed to retrive")
      }
    }) 
  }

  join_room(dost:dost){
     fetch(``, {
      method: 'GET',
      body:JSON.stringify(dost),
      headers: {

      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
      console.log('msg retrived');
        App.chatroom_id=dost.chatroom_id
        App.msg=data.messages
      }else{
        console.log("msg not retrive")
      }
    }) 
  }





}
