import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toggleFade, slideDownFade } from 'src/app/core/animations/toggle-fade';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  animations: [toggleFade, slideDownFade]

})
export class ConfirmComponent implements OnInit, AfterContentInit {

  componentState:boolean = false;

  @Output("deleteConfirmed") deleteConfirmed = new EventEmitter();

  constructor() { }
  ngAfterContentInit(): void {
    this.componentState = true;
  }

  ngOnInit(): void {
  }

  deletedConfirm(state) {
    this.deleteConfirmed.emit(state);
  }

}
