import { AppState } from './../states/app.state';
import { Component, EventEmitter, Output } from '@angular/core';
import { showtempdetno } from '../states/tempDet/tempDet.actions';
import { Store } from '@ngrx/store';
import { selectDetails } from '../states/tempDet/tempDet.selector';
import { selectCurrentCity } from '../states/currentCity/currentCity.selector';

@Component({
  selector: 'app-tempdet',
  standalone: true,
  imports: [],
  templateUrl: './tempdet.component.html',
  styleUrl: './tempdet.component.css'
})
export class TempdetComponent {
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
    this.store.dispatch(showtempdetno())

  }
}
