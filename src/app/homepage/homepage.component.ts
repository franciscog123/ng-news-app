import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service'; 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  topStories$;
  popularStories$;
  popularError$;
  loadTopStories:boolean=true;
  topError$;
  loadPopular:boolean=true;

  constructor( private newsService: NewsService ) {
   }

  ngOnInit(): void {
    this.requestTopStories();
    this.requestPopularStories();
  }

  requestTopStories(){
    this.newsService.getTopStories()
    .subscribe(
      (data) => {
        this.loadTopStories=true;
        this.topStories$ = data;
      },
      (error) => {
        this.loadTopStories=false;
        this.topError$=error;
      }
    );
  }

  requestPopularStories(){
    this.newsService.getPopularStories()
    .subscribe(
      (data) => {
        this.loadPopular=true;
        this.popularStories$ = data;
      },
      (error) => {
        this.loadPopular=false;
        this.popularError$=error;
      });
  }

  constructSrc(index){
    return this.popularStories$.results[index].media[0]["media-metadata"][1].url;
  }

}
