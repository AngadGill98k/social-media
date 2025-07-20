import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { App } from '../../app';

@Component({
  selector: 'app-right',
  imports: [CommonModule,FormsModule],
  templateUrl: './right.html',
  styleUrl: './right.css'
})
export class Right {
  msg:string=''






  handlesend(){
    fetch(``,{
      method:'POST',
      headers:{},
      credentials:'include',
      body:JSON.stringify({msg:this.msg,chatroom_id:App.chatroom_id})
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
        console.log("msg sned")
      }else{
        console.log("msg notn send")
      }
    })
  }
}
