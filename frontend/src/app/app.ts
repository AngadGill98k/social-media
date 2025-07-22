import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Left } from './components/left/left';
import { msg } from './models/msg';
import { Navbar } from "./components/navbar/navbar";
import { Middle } from "./components/middle/middle";
import { Right } from "./components/right/right";
import { Login } from "./components/login/login";
import { Dashboard } from "./components/dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Left, Navbar, Middle, Right, Login, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  static chatroom_id:String=''
  static msg:Array<msg>=[]
  protected readonly title = signal('frontend');
  
}
