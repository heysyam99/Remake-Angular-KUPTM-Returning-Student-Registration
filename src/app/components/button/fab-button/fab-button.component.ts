import { Component, OnInit } from '@angular/core'
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'
import { Router } from '@angular/router'

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss']
})
export class FabButtonComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  donwloadPDF() {
    const node = document.getElementById('PDFconvert')
    let img
    let fileName
    let newImage

    domtoimage.toPng(node, { bgcolor: '#fff' }).then((data) => {
      img = new Image()
      img.src = data
      newImage = img.src

      img.onload = () => {
        const pdfWidth: any = img.width
        const pdfHeight: any = img.height
        let doc

        if (pdfWidth > pdfHeight) {
          doc = new jsPDF('l', 'px', '', 100)
        } else {
          doc = new jsPDF('p', 'px', 'a4')
        }

        const width = doc.internal.pageSize.getWidth()
        const height = doc.internal.pageSize.getHeight()

        doc.addImage(newImage, 'PNG', 0, -15, width, height)
        fileName = 'mypdf_' + '.pdf'
        doc.save(fileName)
      }
    })
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
