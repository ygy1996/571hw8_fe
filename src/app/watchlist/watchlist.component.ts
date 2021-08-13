import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnChanges {
  @Input() input: string;
  show = false;
  list = [];
  mobile = false;
  constructor() {}
  ngOnChanges() {
    if (window.innerWidth <= 576){
      this.mobile = true;
    }
    if (this.input == null || this.input === '[]'){
      this.show = false;
    }
    else{
      this.show = true;
      this.list = JSON.parse(this.input);
      console.log(this.list);
    }
  }

}
