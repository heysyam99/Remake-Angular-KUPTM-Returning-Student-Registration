import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { isPlatformBrowser, Location } from '@angular/common'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loginPage = true
  adminPage = false

  constructor(
    private router: Router
    , private translate: TranslateService
    , private location: Location
  ) {
    if (this.location.path() === '/admin') {
      this.adminPage = true
    }
    if (isPlatformBrowser) {
      translate.setDefaultLang('my-MS')
      setTimeout(() => {
        this.router.events
        .subscribe(() => {
          if (this.router.url === '/login') {
            this.loginPage = true
          } else { this.loginPage = false }
        })
      }, 1000)
    }
  }

  translateChanged(lang: string) {
    this.translate.use(lang)
  }
}
