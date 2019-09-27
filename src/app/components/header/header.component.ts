import { Component, OnInit } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoginPage = true

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (isPlatformBrowser) {
      this.router.events
      .subscribe(() => {
        if (this.router.routerState.snapshot.url !== '/login') {
          this.isLoginPage = false
        } else { this.isLoginPage = true }
      })
    }
  }

}
