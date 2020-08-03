import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  section; //passed in from route parameter
  stories$;
  loadStories:boolean=true;
  storyError$;

  constructor(
    private route:ActivatedRoute,
    private newsService:NewsService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.section = [params.get('subject')];
      this.requestSection(this.section);
    });
    
  }

  requestSection(subject){
    this.newsService.getStoriesBySection(subject)
    .subscribe(
      (data) => {
        this.loadStories=true;
        this.stories$=data;
      },
      (error) => {
        this.loadStories=false;
        this.storyError$=error;
      }
    )
  }

}
