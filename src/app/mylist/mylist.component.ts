import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  public liststring: string;
  constructor() { }

  ngOnInit() {
    this.liststring = window.localStorage.getItem('watchlist');
  }
}
