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
    fetch(``, {
      body: JSON.stringify({ value: this.value }),
      method: 'PUT',
      headers: {

      },
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.msg) {
          this.result = {
            dost_name: data.name,
            dost_id: data.id
          }
        }else{
          console.log("no use rfound")
        }
      })
  }

  add(){
    let id=this.result?.dost_id || ''
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

      }else{
        console.log("failed to send req")
      }
    })
  }





}
