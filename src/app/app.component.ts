import { toggleFade } from 'src/app/core/animations/toggle-fade';
import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [toggleFade]
})
export class AppComponent {
  title = 'bookmarks';

  public fullLoading = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.fullLoading = true;
    }
    if (event instanceof NavigationEnd) {
      this.fullLoading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.fullLoading = false;
    }
    if (event instanceof NavigationError) {
      this.fullLoading = false;
    }
  }


}
