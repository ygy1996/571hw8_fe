import { Component, OnChanges, Input, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CastService{
  constructor(private http: HttpClient) {}
  search_cast(media, id){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/cast/' + media + '/' + id);
  }

  search_actor(id){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/actor/' + id);
  }

  search_accounts(id){
    return this.http.get('https://hw8-backend-310009.wl.r.appspot.com/accounts/' + id);
  }
}

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css'],
  providers: [CastService]
})
export class CastComponent implements OnChanges {
  @Input() media: string;
  @Input() id: string;
  public cast: any;
  public person: any;
  public accounts: any;
  public path: string;
  public mobile = false;
  public place = 'top';
  constructor(private service: CastService, private modalservice: NgbModal) { }

  ngOnChanges(): void {
    if (window.innerWidth <= 576){
      this.mobile = true;
      this.place = 'right';
    }
    this.service.search_cast(this.media, this.id).subscribe(resp => {
      this.cast = resp;
      console.log(this.cast);
    });
  }

  openmodal(i, content): void{
    const id = this.cast[i].id;
    this.path = this.cast[i].path;
    this.service.search_actor(id).subscribe(resp => {
      this.person = resp;
      console.log(this.person);
    });
    this.service.search_accounts(id).subscribe(resp =>{
      this.accounts = resp;
      console.log(this.accounts);
    });
    this.modalservice.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl', scrollable: true});
  }

}
