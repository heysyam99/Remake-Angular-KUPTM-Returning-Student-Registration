import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rent-address',
  templateUrl: './rent-address.component.html',
  styleUrls: ['./rent-address.component.scss']
})
export class RentAddressComponent implements OnInit {

  rentAddressForm: FormGroup
  text = 'Save'
  loadingVisible = false

  constructor(
    private route: Router
    , private service: StudentService
    , private fb: FormBuilder
    , private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.populateData()

    this.rentAddressForm = this.fb.group({
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      postcode: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required]
    })
  }

  populateData() {
    this.service.getStudentRentAddress().subscribe(async (res: any) => {
      if (res) {
        await this.rentAddressForm.patchValue(res.data)
      }
    }, () => {
      this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    })
  }

  async saveData(val?) {

    const studentData = { }

    studentData[`address1`] = val.address1
    studentData[`address2`] = val.address2
    studentData[`postcode`] = val.postcode
    studentData[`city`] = val.city
    studentData[`state`] = val.state
    studentData[`country`] = val.country

    if (studentData && Object.entries(studentData).length !== 0
      && studentData.constructor) {
      await this.service.setStudentRentAddress(studentData).subscribe(() => {
        // TO DO
        this.toastr.success(`Your data has been save`, 'Success !', { timeOut: 1300 })
        this.route.navigate(['/finance']
          , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
      }, err => {
        this.toastr.error(`${err.error.message}`, `Error ${err.status} !`)
      })
    } else {
      this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    }
  }

  onShown() {
    setTimeout(() => {
      this.loadingVisible = false
    }, 1500)
  }

  onHidden() {
    this.populateData()
  }

  back() {
    this.route.navigate(['/address']
      , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
  }

  repopulateData() {
    this.rentAddressForm.reset()

    this.loadingVisible = this.rentAddressForm.invalid ? true : false
  }

  onValueChanged(changes) {
    this.text = changes ? 'Update' : 'Save'
  }
}
