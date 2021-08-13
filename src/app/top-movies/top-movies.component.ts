import { Component, Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TopMovieService{
  constructor(private http: HttpClient) {}

  search(){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/topmovie');
  }
}

@Component({
  selector: 'app-top-movies',
  templateUrl: './top-movies.component.html',
  styleUrls: ['./top-movies.component.css'],
  providers: [TopMovieService]
})
export class TopMoviesComponent implements OnInit {

  constructor(private service: TopMovieService) {}
  movies = [];
  moviesFormatted = [];
  mobile = false;
  ngOnInit() {
    if (window.innerWidth <= 576) {
      this.mobile = true;
    }
    this.service.search().subscribe(resp => {
      this.movies = this.movies.concat(resp);
      let j = -1;
      for (let i = 0; i < this.movies.length; i++) {
        if (i % 6 === 0) {
            j++;
            this.moviesFormatted[j] = [];
            this.moviesFormatted[j].push(this.movies[i]);
        }
        else {
          this.moviesFormatted[j].push(this.movies[i]);
        }
      }
      while (this.moviesFormatted[j].length !== 6){
        this.moviesFormatted[j].push('');
      }
    });
  }
  localsave(x, y){
    var index = 6 * x + y;
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
