import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  animations: [
    trigger('appearance', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),

      transition('show => hide',  animate('0.5s ease-in-out')),
      transition('hide => show',  animate('0.5s ease-in-out'))
    ])
  ]
})
export class ScrollToTopComponent implements OnInit {

  private animationState = 'hide';

  @Input()
  distance: number = 400;

  @Input()
  speed: number = 80;

  @Input()
  acceleration:number = 0;

  @Input()
  classNames: string = 'scroll-to-top';

  @Input()
  animateScroll: boolean;

  constructor() { }

  ngOnInit() {

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.animationState = this.getCurrentScrollDistance() > this.distance ? 'show' : 'hide';
  }

  scrollTop() {
    if(this.animateScroll) {
      this.animatingScrollTop();
    } else {
      this.staticScrollTop();
    }
  }

  staticScrollTop() {
    window.scrollTo(0, 0);
  }

  animatingScrollTop() {
    let initialSpeed = this.speed;

    let interval = setInterval(() => {
      window.scrollBy(0, -initialSpeed);
      initialSpeed += this.acceleration;

      if(this.getCurrentScrollDistance() === 0) {
        clearInterval(interval);
      }

    }, 20)
  }

  getCurrentScrollDistance() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

}
