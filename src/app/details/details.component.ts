import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public media: string;
  public id: string;
  constructor(private route: ActivatedRoute, private router: Router){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.media = this.route.snapshot.paramMap.get('media_type');
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
