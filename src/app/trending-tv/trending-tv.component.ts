import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TrendingTvService{
  constructor(private http: HttpClient) {}

  search(){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/trendingtv');
  }
}

@Component({
  selector: 'app-trending-tv',
  templateUrl: './trending-tv.component.html',
  styleUrls: ['./trending-tv.component.css'],
  providers: [TrendingTvService]
})

export class TrendingTvComponent implements OnInit {

  constructor(private service: TrendingTvService) {}
  tvs = [];
  tvsFormatted = [];
  mobile = false;
  ngOnInit() {
    if (window.innerWidth <= 576) {
      this.mobile = true;
    }
    this.service.search().subscribe(resp => {
      this.tvs = this.tvs.concat(resp);
      let j = -1;
      for (let i = 0; i < this.tvs.length; i++) {
        if (i % 6 === 0) {
            j++;
            this.tvsFormatted[j] = [];
            this.tvsFormatted[j].push(this.tvs[i]);
        }
        else {
          this.tvsFormatted[j].push(this.tvs[i]);
        }
      }
      while (this.tvsFormatted[j].length !== 6){
        this.tvsFormatted[j].push('');
      }
    });
  }
  localsave(x, y){
    var index = 6 * x + y;
    var list = JSON.parse(window.localStorage.getItem('continueList'));
    if (!list){
      list = [];
      list.push(this.tvs[index]);
    }
    else{
      var inlist = false;
      // tslint:disable-next-line: prefer-for-of
      for(var i = 0; i < list.length; i++){
        if (this.tvs[index].id === list[i].id && list[i].media_type === 'tv'){
          inlist = true;
          break;
        }
      }
      if (inlist){
        list = list.slice(0, i).concat(list.slice(i + 1, list.length));
        list.unshift(this.tvs[index]);
      }
      else{
        if (list.length >= 24){
          list.pop();
        }
        list.unshift(this.tvs[index]);
      }
    }
    window.localStorage.setItem('continueList', JSON.stringify(list));
    window.dispatchEvent(new Event('storage'));
  }
}
