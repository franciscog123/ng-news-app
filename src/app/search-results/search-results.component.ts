import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchInput;
  loadResults:boolean=true;
  results$;
  resultsError$;

  constructor(
    private route:ActivatedRoute,
    private newsService:NewsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.searchInput= [params.get('q')];
      this.search(this.searchInput);
    })
  }

  search(searchInput){
    this.newsService.searchArticles(this.searchInput)
    .subscribe(
      (data) => {
        this.loadResults=true;
        this.results$=data;
      },
      (error) => {
        this.loadResults=false;
        this.resultsError$=error;
      }
    )
  }

}
