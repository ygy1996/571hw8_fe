import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent implements OnChanges {
  @Input() input;
  items = [];
  itemsFormatted = [];
  show = false;
  mobile = false;
  constructor() { }

  ngOnChanges(){
    if (window.innerWidth <= 576){
      this.mobile = true;
    }
    if (this.input == null){
      this.show = false;
      this.items = [];
    }
    else{
      this.items = JSON.parse(this.input);
      this.show = (this.items.length > 0);
    }
    let j = -1;
    for (let i = 0; i < this.items.length; i++) {
      if (i % 6 === 0) {
          j++;
          this.itemsFormatted[j] = [];
          this.itemsFormatted[j].push(this.items[i]);
      }
      else {
        this.itemsFormatted[j].push(this.items[i]);
      }
    }
    while (this.itemsFormatted[j].length !== 6){
      this.itemsFormatted[j].push('');
    }
  }
  localsave(x, y){
    var index = 6 * x + y;
    var list = JSON.parse(window.localStorage.getItem('continueList'));
    if (!list){
      list = [];
      list.push(this.items[index]);
    }
    else{
      var inlist = false;
      // tslint:disable-next-line: prefer-for-of
      for(var i = 0; i < list.length; i++){
        if (this.items[index].id === list[i].id && list[i].media_type === this.items[index].media_type){
          inlist = true;
          break;
        }
      }
      if (inlist){
        list = list.slice(0, i).concat(list.slice(i + 1, list.length));
        list.unshift(this.items[index]);
      }
      else{
        if (list.length >= 24){
          list.pop();
        }
        list.unshift(this.items[index]);
      }
    }
    window.localStorage.setItem('continueList', JSON.stringify(list));
    window.dispatchEvent(new Event('storage'));
  }
}
