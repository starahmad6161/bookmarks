import { Directive, Input, OnInit, HostBinding, AfterContentInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAddClass]'
})
export class AddClassDirective implements OnInit{


  @Input("appAddClass") appAddClass;
  @HostBinding("class") className:string;
  constructor() {
  }
  ngOnInit(): void {
    this.className = this.appAddClass;
  }

}
