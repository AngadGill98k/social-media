import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-req',
  imports: [CommonModule],
  templateUrl: './req.html',
  styleUrl: './req.css'
})
export class Req implements OnInit{
  requests:Array<{name:String,id:String}>=[]
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    fetch(``, {
      method: 'GET',
      headers: {

      },
      credentials: 'include'
    }).then(res=>res.json())
    .then(data=>{
      if(data.msg){
        console.log("req found");
        this.requests=data.request
      }else{
        console.log("no req found")
      }
    })
  }

  accept(id:String){
    fetch(``, {
      body: JSON.stringify({ id }),
      method: 'PUT',
      headers: {

      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
        console.log("accepte");
        
      }else{
        console.log("failed to accept")
      }
    })
  }
  reject(id:String){
    fetch(``, {
      body: JSON.stringify({ id }),
      method: 'PUT',
      headers: {

      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.msg){
        console.log("rejected")
      }else{
        console.log("failed to reject")
      }
    })
  }

}
