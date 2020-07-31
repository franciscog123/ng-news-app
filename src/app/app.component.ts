import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  title = 'ng-news-app';

  //https://github.com/angular/components/issues/4280
  //https://github.com/angular/angular/issues/24547
  //workaround for angular material sidenav content not scrolling to top with ScrollPositionRestoration
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe( () => {
        document.querySelector('.mat-sidenav-content').scrollTop = 0;
      })
  }

}
