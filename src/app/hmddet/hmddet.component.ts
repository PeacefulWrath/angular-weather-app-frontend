import { AppState } from '../states/app.state';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDetails } from '../states/hmdDet/hmdDet.selector';
import { selectCurrentCity } from '../states/currentCity/currentCity.selector';
import { showhmddetno } from '../states/hmdDet/hmdDet.actions';

@Component({
  selector: 'app-hmddet',
  standalone: true,
  imports: [],
  templateUrl: './hmddet.component.html',
  styleUrl: './hmddet.component.css'
})
export class HmddetComponent {
  @Output('update')
  change: EventEmitter<boolean> = new EventEmitter<boolean>();
  hmdDetails:any=undefined
  selectedCity:any

  constructor(private store: Store<AppState>) {
    // alert("hummm")
    this.store.select(selectCurrentCity).subscribe((res)=>{
      if(res){
        this.selectedCity=res
      }
    })
    this.store.select(selectDetails).subscribe((res) => {
      // console.log("hhh", res)
      if(res){
      this.hmdDetails=res
      }
    })
  }
  back() {
    this.change.emit(true)
    this.store.dispatch(showhmddetno())

  }
}
