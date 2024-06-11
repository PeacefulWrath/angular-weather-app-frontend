import { showraindetno } from './../states/rainDet/rainDet.actions';
import { AppState } from '../states/app.state';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetails } from '../states/rainDet/rainDet.selector';
import { selectCurrentCity } from '../states/currentCity/currentCity.selector';

@Component({
  selector: 'app-raindet',
  standalone: true,
  imports: [],
  templateUrl: './raindet.component.html',
  styleUrl: './raindet.component.css'
})
export class RaindetComponent {
  @Output('update')
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  tempDetails:any=undefined
  selectedCity:any

  constructor(private store: Store<AppState>) {
    this.store.select(selectCurrentCity).subscribe((res)=>{
      if(res){
        this.selectedCity=res
      }
    })
    this.store.select(selectDetails).subscribe((res) => {
      // console.log("hhh", res)
      if(res){
      this.tempDetails=res
      }
    })
  }
  back() {
    this.change.emit(true)
    this.store.dispatch(showraindetno())

  }
}
