import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  list = window.localStorage.getItem('continueList');
  show = (!this.list === null);
  ngOnInit() {
    window.addEventListener('storage', () => {
      this.list = window.localStorage.getItem('continueList');
      this.show = (this.list.length > 0);
    });
  }
}
