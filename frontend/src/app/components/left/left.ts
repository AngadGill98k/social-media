import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List } from './list/list';
import { Search } from './search/search';
import { Req } from './req/req';
@Component({
  selector: 'app-left',
  imports: [CommonModule,List,Search,Req],
  templateUrl: './left.html',
  styleUrl: './left.css'
})
export class Left {
   list: boolean = true;
   search: boolean = false;
   req: boolean = false;




  handlelist() {
    this.list=true;
    this.search=false
    this.req=false
  }
  handlesearch(){
    this.list=false;
    this.search=true
    this.req=false
  }
  handlereq(){
    this.list=false;
    this.search=false
    this.req=true
  }
}
