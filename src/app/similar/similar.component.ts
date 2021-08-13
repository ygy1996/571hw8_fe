import { Component, OnChanges, Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SimilarService{
  constructor(private http: HttpClient) {}

  search(media, id){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/similar/' + media + '/' + id );
  }
}

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css'],
  providers: [SimilarService]
})
export class SimilarComponent implements OnChanges {
  @Input() media: string;
  @Input() id: string;
  public items: any;
  public itemsFormatted = [];
  public title: string;
  public mobile = false;
  constructor(private service: SimilarService) { }

  ngOnChanges() {
    if (window.innerWidth <= 576){
      this.mobile = true;
    }
    if (this.media === 'movie'){
      this.title = 'Similar Movies';
    }
    else{
      this.title = 'Similar TV Shows';
    }
    this.service.search(this.media, this.id).subscribe(resp => {
      this.items = resp;
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
    });
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
