import { Component, OnInit } from '@angular/core'
import { StudentService } from 'src/app/services/student.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  imgUrl = '../../assets/upload.png'
  fileToUpload
  loadIndicatorVisible = false
  paymentDetailsForm: FormGroup
  millisecondsInDay = 24 * 60 * 60 * 1000
  currencyButton = {
    text: 'MYR'
    , stylingMode: 'text'
  }

  constructor(
    private service: StudentService
    , private fb: FormBuilder
    , private route: Router
    , private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.paymentDetailsForm = this.fb.group({
      refNumber: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
      datePaid: ['', Validators.compose([Validators.required])],
    })

    this.populateData()
    this.populateReceipt()
  }

  populateData() {
    this.service.getStudentFinance().subscribe(async (res: any) => {
      if (res) {
        await this.paymentDetailsForm.patchValue(res.data)
      }
    })
  }

  populateReceipt() {
    const id = this.service.getCurrUser()
    this.imgUrl = `http://localhost:8080/uploads/${id}.png`
  }

  updateUrl(e) {
    if (e.type === 'error') {
      this.imgUrl = '../../assets/upload.png'
    }
  }

  async handleFileInput(file) {
    this.fileToUpload = file.value[0]

    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.imgUrl = e.target.result
    }
    reader.readAsDataURL(this.fileToUpload)

    await this.service.uploadImage(this.fileToUpload).subscribe(() => {
      this.toastr.success(`Your receipt has been uploaded`, 'Success !', { timeOut: 1000 })
      const elem = document.getElementsByClassName('dx-fileuploader-file-status-message')[0]
      elem.id = 'upload-msg'
      document.getElementById('upload-msg').remove()
    }, err => {
      this.toastr.error(`Oops, some misleading happened here`, `Error ${err.status} !`)
    })
  }

  async saveData(val?) {
    const studentData = {}

    studentData[`refNumber`] = val.refNumber
    studentData[`amount`] = val.amount
    studentData[`datePaid`] = val.datePaid

    if (studentData && Object.entries(studentData).length !== 0
      && studentData.constructor) {
      await this.service.updateStudentFinace(studentData).subscribe(() => {
        this.toastr.success(`Your data has been save`, 'Success !', { timeOut: 1000, positionClass: `toast-top-right` })
        this.route.navigate(['/verify']
          , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
      }, err => {
        this.toastr.error(`${err.error.message}`, `Error ${err.status} !`)
      })
    } else {
      this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    }
  }

  back() {
    this.route.navigate(['/rental-address']
      , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
  }
}
