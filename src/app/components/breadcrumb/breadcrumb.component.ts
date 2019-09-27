import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(
    private router: Router
  ) {

      if (isPlatformBrowser) {
        const url = this.router.url.split('?')[0]

        this.router.events
        .subscribe(() => {
          if (url !== '/login') {

            if (url === '/address') {
              this.removeAllAttr()

              const el = getElementById('input_3')
              const attr = createAttribute('checked')

              el.setAttributeNode(attr)
            } else if (url === '/rental-address') {
              this.removeAllAttr()

              const el = getElementById('input_2')
              const attr = createAttribute('checked')

              el.setAttributeNode(attr)
            } else if (url === '/finance') {
              this.removeAllAttr()

              const el = getElementById('input_1')
              const attr = createAttribute('checked')

              el.setAttributeNode(attr)
            } else {
              this.removeAllAttr()

              const el = getElementById('input_0')
              const attr = createAttribute('checked')

              el.setAttributeNode(attr)
            }
          }
      })
    }
  }

  ngOnInit() { }

  removeAllAttr() {
    removeAttribute('input_0', 'checked')
    removeAttribute('input_1', 'checked')
    removeAttribute('input_2', 'checked')
    removeAttribute('input_3', 'checked')
  }

}

/*
  To minimize the current code
*/

function getElementById(e) {
  return document.getElementById(e)
}

function createAttribute(e) {
  return document.createAttribute(e)
}

function removeAttribute(id, a) {
  return getElementById(id).removeAttribute(a)
}
