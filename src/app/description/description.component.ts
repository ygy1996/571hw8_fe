import { Component, OnChanges, Input, Injectable, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DescriptionService{
  constructor(private http: HttpClient) {}

  searchDetails(media, id){
    if (media === 'movie'){
      return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/moviedetail/' + id);
    }
    else if (media === 'tv'){
      return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/tvdetail/' + id);
    }
  }

  searchVideos(media, id){
    if (media === 'movie'){
      return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/movievideo/' + id);
    }
    else if (media === 'tv'){
      return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/tvvideo/' + id);
    }
  }
}
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  providers: [DescriptionService]
})
export class DescriptionComponent implements OnChanges {
  @Input() media: string;
  @Input() id: string;
  public details: any;
  public videoId: string;
  public inwatchlist = false;
  public listindex = -1;
  public watchlist = [];
  public text = 'Add to Watchlist';
  public alerttext = 'Added to Watchlist';
  public type = 'success';
  successMessage = '';
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  constructor(private service: DescriptionService) {}

  ngOnChanges(): void {
    this.service.searchDetails(this.media, this.id).subscribe(resp => {
      this.details = resp;
      console.log(this.details);
    });
    this.service.searchVideos(this.media, this.id).subscribe(resp => {
      console.log(resp);
      this.videoId = resp['video_id'];
    });
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
    const liststring = window.localStorage.getItem('watchlist');
    if (liststring.length !== 0){
      this.watchlist = JSON.parse(liststring);
      // tslint:disable-next-line: prefer-for-of
      for (var i = 0; i < this.watchlist.length; i++){
        if (this.watchlist[i]['media_type'] === this.media && this.watchlist[i]['id'] === this.id){
          this.inwatchlist = true;
          this.listindex = i;
          this.text = 'Remove from Watchlist';
          this.alerttext = 'Removed from Watchlist';
          this.type = 'danger';
        }
      }
    }
  }
  changelist(): void{
    if (this.inwatchlist){
      this.watchlist = this.watchlist.slice(0, this.listindex).concat(this.watchlist.slice(this.listindex + 1, this.watchlist.length));
      window.localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
      this.inwatchlist = false;
      this.listindex = -1;
      this.text = 'Add to Watchlist';
    }
    else{
      this.watchlist.unshift({media_type: this.media, id: this.id, name: this.details['title'], path: this.details['path']});
      window.localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
      this.inwatchlist = true;
      this.listindex = this.watchlist.length - 1;
      this.text = 'Remove from Watchlist';
    }
    this._success.next('123');
  }
  closealert(): void{
    this.successMessage = '';
    if (this.inwatchlist){
      this.type = 'danger';
      this.alerttext = 'Removed from Watchlist';
    }
    else{
      this.type = 'success';
      this.alerttext = 'Added to Watchlist';
    }
  }
}
