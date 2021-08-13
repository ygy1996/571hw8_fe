import { Component, Injectable, OnInit} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CurrentService {
  constructor(private http: HttpClient) {}

  search(){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/currentmovie');
  }
}

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css'],
  providers: [CurrentService],
})

export class CurrentComponent implements OnInit{
  constructor(private service: CurrentService) {}
  movies = [];
  pauseOnHover = true;
  pauseOnFocus = true;
  mobile = false;
  ngOnInit(){
    if (window.innerWidth <= 576){
      this.mobile = true;
    }
    this.service.search().subscribe(resp => {this.movies = this.movies.concat(resp);});
  }
  localsave(index){
    var list = JSON.parse(window.localStorage.getItem('continueList'));
    if (!list){
      list = [];
      list.push(this.movies[index]);
    }
    else{
      var inlist = false;
      // tslint:disable-next-line: prefer-for-of
      for(var i = 0; i < list.length; i++){
        if (this.movies[index].id === list[i].id && list[i].media_type === 'movie'){
          inlist = true;
          break;
        }
      }
      if (inlist){
        list = list.slice(0, i).concat(list.slice(i + 1, list.length));
        list.unshift(this.movies[index]);
      }
      else{
        if (list.length >= 24){
          list.pop();
        }
        list.unshift(this.movies[index]);
      }
    }
    window.localStorage.setItem('continueList', JSON.stringify(list));
    window.dispatchEvent(new Event('storage'));
  }
}

