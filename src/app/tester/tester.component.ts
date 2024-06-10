import { AppState } from './../states/app.state';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectName } from '../states/user/user.selector';
import { updateuserdetails } from '../states/user/user.actions';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tester',
  standalone: true,
  imports: [AsyncPipe,FormsModule],
  templateUrl: './tester.component.html',
  styleUrl: './tester.component.css'
})
export class TesterComponent {
  name$:Observable<string>;
  nameInput!: string;

  constructor(private store:Store<AppState>){
    this.name$=this.store.select(selectName)
  }

  update(){
    this.store.dispatch(updateuserdetails({name:this.nameInput,city:'kolkata',email:'sk@gmail.com'}))
    }
}
