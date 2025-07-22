import { Component } from '@angular/core';
import { Create } from "./create/create";
import { Posts } from "./posts/posts";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [Create, Posts,CommonModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

toggle:boolean=true;
}
