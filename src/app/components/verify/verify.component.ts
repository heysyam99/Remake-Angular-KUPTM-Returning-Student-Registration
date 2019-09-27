import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { StudentService } from 'src/app/services/student.service'
import { Router } from '@angular/router'
import * as jsPDF from 'jspdf'
import domtoimage from 'dom-to-image'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  studentDetailForm: FormGroup
  studentfinanceForm: FormGroup
  studentRecordForm: FormGroup
  recordCompletion
  studentwelfareCompletion

  constructor(
    private fb: FormBuilder
    , private service: StudentService
    , private router: Router
  ) { }

  ngOnInit() {

    this.studentDetailForm = this.fb.group({
      name: ['', Validators.required]
      , id: ['', Validators.required]
      , ic: ['', Validators.required]
      , prgcode: ['', Validators.required]
    })

    this.studentfinanceForm = this.fb.group({
      refNumber: ['', Validators.required]
      , amount: ['', Validators.required]
      , datePaid: ['', Validators.required]
    })

    this.studentRecordForm = this.fb.group({
      completion: ['', Validators.required]
    })

    this.populateStudentDetails()
    this.populateStudentFinanceDetails()
    this.mailingAddressValidation()
    this.rentalAddressValidation()
  }

  async mailingAddressValidation() {
    await this.service.getStudentMailAddress().subscribe((res: any) => {
      if (res && res.data) {
        this.recordCompletion = !hasNull(res.data, 1) ? 'LENGKAP' : 'TIDAK LENGKAP'
      }
    })
  }

  async rentalAddressValidation() {
    await this.service.getStudentRentAddress().subscribe((res: any) => {
      if (res && res.data) {
        this.studentwelfareCompletion = !hasNull(res.data, 1) ? 'LENGKAP' : 'TIDAK LENGKAP'
      }
    })
  }

  async populateStudentDetails() {
    await this.service.getStudentDetail().subscribe((res) => {
      if (res) {
        this.studentDetailForm.patchValue(res)
      }
    })
  }

  async populateStudentFinanceDetails() {
    await this.service.getStudentFinance().subscribe((res: any) => {
      if (res && res.data) {
        this.studentfinanceForm.patchValue(res.data)
      }
    })
  }

  // captureScreen() {
  //   const data = document.getElementById('PDFconvert')
  //   html2canvas(data).then(canvas => {
  //     const imgWidth = 208
  //     const pageHeight = 295
  //     const imgHeight = canvas.height * imgWidth / canvas.width
  //     const heightLeft = imgHeight
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     const pdf = new jspdf('p', 'mm', 'a4')
  //     const position = 0
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     pdf.save('Test.pdf')
  //   })
  // }

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

}

function hasNull(object, limit?: number) {
  let nullValue = 0

  for (const key in object) {
    if (object[key] == null || object[key] === '') {
      if (limit) {
        nullValue++
        if (nullValue > limit) {
          return true
        }
      } else {
        return true
      }
    }
  }
  return false
}
