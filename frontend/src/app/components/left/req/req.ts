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
    fetch(`http://localhost:8000/ret_req`, {
      method: 'GET',
      credentials: 'include'
    }).then(res=>res.json())
    .then(data=>{
      if(data.msg){
        console.log(data)
        console.log("req found");
        this.requests=data.requests
      }else{
        console.log("no req found")
      }
    })
  }
 getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
  accept(id:String){
    const csrfToken = this.getCookie('XSRF-TOKEN');
    fetch(`http://localhost:8000/update_status`, {
      body: JSON.stringify({ id,status:"accepted" }),
      method: 'PUT',
      headers: {
'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
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
     const csrfToken = this.getCookie('XSRF-TOKEN');
    fetch(`http://localhost:8000/update_status`, {
      body: JSON.stringify({ id,status:"rejected" }),
      method: 'PUT',
      headers: {
'Content-Type': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
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
