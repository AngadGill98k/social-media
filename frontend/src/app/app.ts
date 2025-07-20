import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Left } from './components/left/left';
import { msg } from './models/msg';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Left],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  static chatroom_id:String=''
  static msg:Array<msg>=[]
  protected readonly title = signal('frontend');
}
