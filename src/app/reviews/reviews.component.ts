import { Component, OnChanges, Input, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ReviewService{
  constructor(private http: HttpClient) {}
  search_review(media, id){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/review/' + media + '/' + id);
  }
}


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  providers: [ReviewService]
})
export class ReviewsComponent implements OnChanges {
  @Input() media: string;
  @Input() id: string;
  public reviews: any;
  public length: number;
  public mobile =false;
  constructor(private service: ReviewService) { }

  ngOnChanges() {
    if (window.innerWidth <= 576){
      this.mobile = true;
    }
    this.service.search_review(this.media, this.id).subscribe(resp => {
      this.reviews = resp;
      this.length = this.reviews.length;
      console.log(this.reviews);
    });
  }

}
