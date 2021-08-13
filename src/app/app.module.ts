import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailsComponent } from './details/details.component';
import { MylistComponent } from './mylist/mylist.component';
import {CurrentComponent} from './current/current.component';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { TrendingMoviesComponent } from './trending-movies/trending-movies.component';
import { TopMoviesComponent } from './top-movies/top-movies.component';
import { PopTvComponent } from './pop-tv/pop-tv.component';
import { TopTvComponent } from './top-tv/top-tv.component';
import { TrendingTvComponent } from './trending-tv/trending-tv.component';
import { ContinueWatchingComponent } from './continue-watching/continue-watching.component';
import { DescriptionComponent } from './description/description.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CastComponent } from './cast/cast.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SimilarComponent } from './similar/similar.component';
import { RecommandComponent } from './recommand/recommand.component';
import { WatchlistComponent } from './watchlist/watchlist.component';

@NgModule({
  declarations: [					
    AppComponent,
    TopBarComponent,
    TypeaheadComponent,
      HomepageComponent,
      DetailsComponent,
      MylistComponent,
      CurrentComponent,
      PopularMoviesComponent,
      TrendingMoviesComponent,
      TopMoviesComponent,
      PopTvComponent,
      TopTvComponent,
      TrendingTvComponent,
      ContinueWatchingComponent,
      DescriptionComponent,
      CastComponent,
      ReviewsComponent,
      SimilarComponent,
      RecommandComponent,
      WatchlistComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
