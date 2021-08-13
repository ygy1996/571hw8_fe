import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {DetailsComponent} from './details/details.component';
import {MylistComponent} from './mylist/mylist.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'watch/:media_type/:id', component: DetailsComponent},
  {path: 'mylist', component: MylistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
