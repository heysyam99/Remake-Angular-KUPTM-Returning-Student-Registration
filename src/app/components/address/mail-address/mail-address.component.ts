import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { StudentService } from 'src/app/services/student.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-mail-address',
  templateUrl: './mail-address.component.html',
  styleUrls: ['./mail-address.component.scss']
})
export class MailAddressComponent implements OnInit {

  formValidation = false
  mailAddressForm: FormGroup
  text = 'Save'
  loadingVisible = false

  constructor(
    private fb: FormBuilder
    , private service: StudentService
    , private router: Router
    , private toastr: ToastrService
  ) { }

  ngOnInit() {
    /**
     * The form `constructor` has been changed to fix Angular `warning` that occured
     * when using [disabled] or `disabled` on `dx-text-box`
     */
    this.mailAddressForm = this.fb.group({
      phone: ['', Validators.required]
      , address1: ['', Validators.required]
      , address2: ['', Validators.required]
      , postcode: ['', Validators.required]
      , city: ['', Validators.required]
      , state: ['', Validators.required]
      , country: ['', Validators.required]
    })

    this.populateData()
  }

  populateData() {
    this.service.getStudentMailAddress().subscribe(async (res: any) => {
      if (res) {
        await this.mailAddressForm.patchValue(res.data)
      }
    }, () => {
      this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    })
  }

  async saveData(val?) {

    const studentData = { }

    studentData[`phone`] = val.phone
    studentData[`address1`] = val.address1
    studentData[`address2`] = val.address2
    studentData[`postcode`] = val.postcode
    studentData[`city`] = val.city
    studentData[`state`] = val.state
    studentData[`country`] = val.country

    if (studentData && Object.entries(studentData).length !== 0
      && studentData.constructor) {
      await this.service.setStudentMailAddress(studentData).subscribe(() => {
        this.toastr.success(`Your data has been save`, 'Success !', { timeOut: 1300 })
        this.router.navigate(['/rental-address']
          , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
          if (this.mailAddressForm.valid) {
            this.formValidation = true
          } else {
            this.formValidation = false
          }
      }, err => {
        this.toastr.error(`${err.error.message}`, `Error ${err.status} !`)
      })
    } else {
      this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    }
  }

  repopulateData() {
    this.mailAddressForm.reset()

    this.loadingVisible = this.mailAddressForm.invalid ? true : false
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false
    }, 1500)
  }


  onHidden() {
    this.populateData()
  }

  onValueChanged(changes) {
    this.text = changes ? 'Update' : 'Save'
  }
}
