import {Component, HostListener, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-scroll-to-top',
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
  distance: number;

  @Input()
  speed: number;

  @Input()
  classNames: string;

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

  }

  staticScrollTop() {
    window.scrollTo(0, 0);
  }

  animatingScrollTop() {

  }

  getCurrentScrollDistance() {
    return document.documentElement.scrollTop || document.body.scrollTop;
  }

}
