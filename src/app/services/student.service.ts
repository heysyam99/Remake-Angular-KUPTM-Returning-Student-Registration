import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  loginStudent(data) {

    const observe = 'observe'

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    postHttpOptions[observe] = 'response'

    return this.http.post(`${this.url}/student/login`, data, postHttpOptions)
      .pipe(map((res: any) => {
        sessionStorage.setItem('_userID', res.body.id)
        sessionStorage.setItem('_IC', res.body.ic)
        sessionStorage.setItem('image', res.body.image)
        sessionStorage.setItem('_token', res.body.token)

        return res
      }))
  }

  getStudentMailAddress() {
    const id = sessionStorage.getItem('_userID')

    return this.http.get(`${this.url}/student/address/permaddress/${id}`)
  }

  getStudentRentAddress() {
    const id = sessionStorage.getItem('_userID')

    return this.http.get(`${this.url}/student/address/rentaladdress/${id}`)
  }

  getStudentFinance() {
    const id = sessionStorage.getItem('_userID')

    return this.http.get(`${this.url}/student/finance/${id}`)
  }

  setStudentMailAddress(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        , Authorization: this.getToken()
      })
    }

    postHttpOptions[`observe`] = 'response'

    const studentID = sessionStorage.getItem('_userID')

    return this.http.put(`${this.url}/student/address/permaddress/${studentID}`, data, postHttpOptions)
  }

  setStudentRentAddress(data) {
    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        , Authorization: this.getToken()
      })
    }

    postHttpOptions[`observe`] = 'response'

    const studentID = sessionStorage.getItem('_userID')

    return this.http.put(`${this.url}/student/address/rentaladdress/${studentID}`, data, postHttpOptions)
  }

  updateStudentFinace(data) {

    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        , Authorization: this.getToken()
      })
    }

    postHttpOptions[`observe`] = 'response'

    const studentID = sessionStorage.getItem('_userID')

    return this.http.put(`${this.url}/student/finance/${studentID}`, data, postHttpOptions)

  }

  uploadImage(fileToUpload: File) {
    const id = sessionStorage.getItem('_userID')
    const formData: FormData = new FormData()

    formData.append('filename', fileToUpload, fileToUpload.name)

    return this.http.post(`${this.url}/student/finance/upload/${id}`, formData)
  }

  getStudentDetail() {
    const id = sessionStorage.getItem('_userID')

    return this.http.get(`${this.url}/student/studentdetail/${id}`)
  }

  isLoggedin() {
    return this.getToken() !== null
  }

  sendToken(token) {
    sessionStorage.setItem('_currUser', token)
  }

  getCurrUser() {
    return sessionStorage.getItem('_currUser')
  }

  getToken() {
    return sessionStorage.getItem('_token')
  }

  logout() {
    return sessionStorage.clear()
  }


  /**
   *
   * This is for the admin site
   *
   */

  getAllStudentMailingAddress() {
    return this.http.get(`${this.url}/admin/mailingAddress`)
  }

  getAllStudentRentalAddress() {
    return this.http.get(`${this.url}/admin/rentalAddress`)
  }

  adminSetMailingAddress(data, id) {
    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    postHttpOptions[`observe`] = 'response'

    const studentID = id

    return this.http.put(`${this.url}/admin/mailingAddress/${studentID}`, data, postHttpOptions)
  }

  adminSetRentalAddress(data, id) {
    const postHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    postHttpOptions[`observe`] = 'response'

    const studentID = id

    return this.http.put(`${this.url}/admin/rentalAddress/${studentID}`, data, postHttpOptions)
  }
}
