import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCheckbox]'
})
export class CheckboxDirective {
  @HostListener("click") onClick() {
    this.checked = !this.checked;
  }
  @HostBinding("class.checked") checked:boolean;



  constructor(private el: ElementRef) {
  }

  isChecked() {
    return this.el.nativeElement.checked;
  }

}
