import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';



@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/multisearch/' + term);
  }
}

@Component({
  selector: 'app-typeahead-component',
  templateUrl: './typeahead.component.html',
  providers: [SearchService],
  styles: [`.form-control { width: 300px; }`]
})
export class TypeaheadComponent {
  constructor(private service: SearchService) {}
  search = (text$: Observable<string>) => {
    return text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        // switchMap allows returning an observable rather than maps array
        switchMap( (searchText) =>  this.service.search(searchText) ),
    );
  }
  localsave(name, id, path, type){
    // tslint:disable-next-line: object-literal-shorthand
    const item = {name: name, id: id, path: path, media_type: type};
    var list = JSON.parse(window.localStorage.getItem('continueList'));
    if (!list){
      list = [];
      list.push(item);
    }
    else{
      var inlist = false;
      // tslint:disable-next-line: prefer-for-of
      for(var i = 0; i < list.length; i++){
        if (id === list[i].id && list[i].media_type === type){
          inlist = true;
          break;
        }
      }
      if (inlist){
        list = list.slice(0, i).concat(list.slice(i + 1, list.length));
        list.unshift(item);
      }
      else{
        if (list.length >= 24){
          list.pop();
        }
        list.unshift(item);
      }
    }
    window.localStorage.setItem('continueList', JSON.stringify(list));
    window.dispatchEvent(new Event('storage'));
  }
}
