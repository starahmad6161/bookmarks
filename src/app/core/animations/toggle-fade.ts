import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
export const toggleFade = [
  trigger('fade', [
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate("300ms", style({opacity: 1}))
    ]),
    transition(':leave', [
      style({
        opacity: 1
      }),
      animate("300ms", style({opacity: 0}))
    ]),
  ])
]
export const slideDownFade = [
  trigger('slideDownFade', [
    transition(':enter', [
      style({
        opacity: .8,
        transform: "translateY(-100px)"
      }),
      animate("300ms ease-in-out", style({opacity: 1,transform: "translateY(0)"}))
    ]),
    transition(':leave', [
      animate("300ms ease-in-out", style({opacity:0,transform: "translateY(100px)"}))
    ]),
  ]),
]
