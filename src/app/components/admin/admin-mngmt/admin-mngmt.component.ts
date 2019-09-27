import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-admin-mngmt',
  templateUrl: './admin-mngmt.component.html',
  styleUrls: ['./admin-mngmt.component.scss']
})
export class AdminMngmtComponent implements OnInit {
  mailAddressDS
  rentAddressDS
  sessionId

  constructor(
    private service: StudentService
    , public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.populateMailAddressDetails()
    this.populateRentAddressDetails()
    this.setSessionId()
  }

  async populateMailAddressDetails() {
    await this.service.getAllStudentMailingAddress().subscribe((res: any) => {
      this.mailAddressDS = res.data
    })
  }

  async populateRentAddressDetails() {
    await this.service.getAllStudentRentalAddress().subscribe((res: any) => {
      this.rentAddressDS = res.data
    })
  }

  async onUpdateMailing(val) {
    if (val && Object.entries(val).length !== 0 && val.constructor) {
      const id = val.id

      await this.service.adminSetMailingAddress(val, id).subscribe(() => {
        this.cdr.markForCheck()
      }, err => {
        this.populateMailAddressDetails()
      })
    }
  }

  async onUpdateRental(val) {
    if (val && Object.entries(val).length !== 0 && val.constructor) {
      const id = val.id

      await this.service.adminSetRentalAddress(val, id).subscribe(() => {
        this.cdr.markForCheck()
      }, err => {
        this.populateRentAddressDetails()
      })
    }
  }

  setSessionId() {
    this.sessionId = generateRandomNumber()
  }
}

function generateRandomNumber() {
  const max = 1000000,
      min = 0
  return Math.floor(Math.random() * (max - min + 1)) + min
}
