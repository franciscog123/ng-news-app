import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  apiKey = 'a2GSrPYNX2wsxG3Vnq5nRkwU7rpfP8We';

  options = {
    observe: 'body' as const,
    responseType: 'json' as const,
  };

  constructor(private http: HttpClient) { }

  getTopStories() {
    return this.http.get(`https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=${this.apiKey}`,this.options)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getPopularStories() {
    return this.http.get(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${this.apiKey}`,this.options)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getStoriesBySection(section) {
    return this.http.get(`https://api.nytimes.com/svc/news/v3/content/all/${section}.json?api-key=${this.apiKey}&limit=20`,this.options)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  searchArticles(keywords) {
    //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=your-api-key example call with pagination
    return this.http.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keywords}&api-key=${this.apiKey}`,this.options)
    .pipe(
      //tap((data) => console.log(data)),
      retry(1),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
