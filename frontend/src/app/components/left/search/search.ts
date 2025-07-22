import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  value: String = ''
  result: { dost_name: string; dost_id: string } | null = null;



  handleseacrh() {
    fetch(`http://localhost:8000/api/search_user`, {
      body: JSON.stringify({ value: this.value }),
      method: 'POST',
      headers: {
  'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          
          this.result = {
            dost_name: data.user.name,
            dost_id: data.user.id
          }
        }else{
          console.log("no use rfound")
        }
      })
  }
 getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift()!;
    return null;
  }
  add(){
    let id=this.result?.dost_id || ''
      const csrfToken = this.getCookie('XSRF-TOKEN');
    fetch(`http://localhost:8000/send_req`, {
      body: JSON.stringify({ id }),
      method: 'POST',
      headers: {
  'Content-Type': 'application/json',
    'X-XSRF-TOKEN': decodeURIComponent(csrfToken || '')
      },
      credentials: 'include'
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      if(data.msg){
console.log("send req")
      }else{
        console.log("failed to send req")
      }
    })
  }





}
