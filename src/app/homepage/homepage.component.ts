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

  constructor( private newsService: NewsService ) {
   }

  ngOnInit(): void {
    this.requestTopStories();
    this.requestPopularStories();
  }

  requestTopStories(){
    this.newsService.getTopStories()
    .subscribe((data) => this.topStories$ = data);
  }

  requestPopularStories(){
    this.newsService.getPopularStories()
    .subscribe((data) => this.popularStories$ = data);
  }

  constructSrc(index){
    return this.popularStories$.results[index].media[0]["media-metadata"][1].url;
  }

}
