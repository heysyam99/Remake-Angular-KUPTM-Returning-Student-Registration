import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { StudentService } from 'src/app/services/student.service'
import { ToastrService } from 'ngx-toastr'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  lang
  errMsg: any
  loading = false
  passwordButton
  passwordMode = 'password'
  buttonText
  loadIndicatorVisible = false

  constructor(
    private fb: FormBuilder
    , private router: Router
    , private toastr: ToastrService
    , private service: StudentService
    , private translate: TranslateService
  ) {

    this.passwordButton = {
      // tslint:disable-next-line:max-line-length
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB7klEQVRYw+2YP0tcQRTFz65xFVJZpBBS2O2qVSrRUkwqYfUDpBbWQu3ELt/HLRQ/Q8RCGxVJrRDEwj9sTATxZ/Hugo4zL/NmV1xhD9xi59177pl9986fVwLUSyi/tYC+oL6gbuNDYtyUpLqkaUmfJY3a+G9JZ5J2JW1J2ivMDBSxeWCfeBxYTHSOWMcRYLOAEBebxtEVQWPASQdi2jgxro4E1YDTQIJjYM18hszGbew4EHNq/kmCvgDnHtI7YBko58SWgSXg1hN/btyFBM0AlwExczG1YDZrMS4uLUeUoDmgFfjLGwXEtG05wNXyTc4NXgzMCOAIGHD8q0ATuDZrempkwGJ9+AfUQ4K+A/eEseqZ/UbgdUw4fqs5vPeW+5mgBvBAPkLd8cPju+341P7D/WAaJGCdOFQI14kr6o/zvBKZYz11L5Okv5KGA89Kzu9K0b0s5ZXt5PjuOL6TRV5ZalFP4F+rrnhZ1Cs5vN6ijmn7Q162/ThZq9+YNW3MbfvDAOed5cxdGL+RFaUPKQtjI8DVAr66/u9i6+jJzTXm+HFEVqxVYBD4SNZNKzk109HxoycPaG0bIeugVDTp4hH2qdXJDu6xOAAWiuQoQdLHhvY1aEZSVdInG7+Q9EvSz9RrUKqgV0PP3Vz7gvqCOsUj+CxC9LB1Dc8AAAASdEVYdEVYSUY6T3JpZW50YXRpb24AMYRY7O8AAAAASUVORK5CYII=',
      type: 'default',
      onClick: () => {
          this.passwordMode = this.passwordMode === 'password' ? 'text' : 'password';
      }
  };

  }

  ngOnInit() {
    this.service.logout()
    this.loginForm = this.fb.group({
      studentID: ['', Validators.compose([Validators.required])]
      , studentIC: ['', Validators.compose([Validators.required])]
    })
  }

  async studentLogin(val) {
    const studentData = { }
    const studentID = 'id'
    const studentIC = 'ic'

    this.loadIndicatorVisible = true


    studentData[studentID] = val.studentID
    studentData[studentIC] = val.studentIC

   /**
    * To ensure the input from the user are same with return obj `studentData`
    */
    if (studentData && Object.values(studentData).indexOf(val.studentID) > -1
    && Object.values(studentData).indexOf(val.studentIC) > -1) {
      /**
       *  To ensure that the @object return is not empty
       */
      if (studentData && Object.entries(studentData).length !== 0
      && studentData.constructor) {
        await this.service.loginStudent(studentData).subscribe(() => {
          this.loadIndicatorVisible = false
          this.service.sendToken(this.loginForm.value.studentID)
          this.toastr.success(`You are logged in`, 'Success !', { timeOut: 1300 })
          this.router.navigate(['/address']
          , { queryParams: { student: `${sessionStorage.getItem('_userID')}` } })
          // , { queryParams: { student: `${this.service.getCurrUser()}` } })
        },
          err => {
            err.error.message.forEach((error) => {
              this.toastr.error(`${error}`, `Error ${err.status} !`)
            })
            this.loadIndicatorVisible = false
          })
        } else {
          this.loadIndicatorVisible = false
          this.toastr.error(`Oops, some misleading happened here`, 'Error !')
        }
      } else {
        this.loadIndicatorVisible = false
        this.toastr.error(`Oops, some misleading happened here`, 'Error !')
    }
  }
}

