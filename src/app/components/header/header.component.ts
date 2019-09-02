import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private copyrights = "Data provided by Marvel. © 2014 Marvel";

  constructor() { }

  ngOnInit() {
  }

}
