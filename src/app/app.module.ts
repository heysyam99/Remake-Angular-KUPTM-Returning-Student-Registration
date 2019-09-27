import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ToastrModule } from 'ngx-toastr'
import {TranslateLoader, TranslateModule} from '@ngx-translate/core'
import {TranslateHttpLoader} from '@ngx-translate/http-loader'

import {
  DxTextBoxModule
  , DxFormModule
  , DxButtonModule
  , DxLoadIndicatorModule
  , DxTemplateModule
  , DxTextAreaModule,
  DxFileUploaderModule,
  DxDateBoxModule,
  DxNumberBoxModule,
  DxLoadPanelModule,
  DxToastModule,
  DxDataGridModule
 } from 'devextreme-angular'
 import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { HeaderComponent } from './components/header/header.component'
import { StudentService } from './services/student.service'
import { MailAddressComponent } from './components/address/mail-address/mail-address.component'
import { RentAddressComponent } from './components/address/rent-address/rent-address.component'
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component'
import { FinanceComponent } from './components/finance/finance.component'
import { VerifyComponent } from './components/verify/verify.component'
import { FormTitleComponent } from './components/form/form-title/form-title.component'
import { FormInstructionComponent } from './components/form/form-instruction/form-instruction.component'
import { InputTitleComponent } from './components/form/input-title/input-title.component'
import { FabButtonComponent } from './components/button/fab-button/fab-button.component'
import { AdminMngmtComponent } from './components/admin/admin-mngmt/admin-mngmt.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RentAddressComponent,
    MailAddressComponent,
    BreadcrumbComponent,
    FinanceComponent,
    VerifyComponent,
    FormTitleComponent,
    FormInstructionComponent,
    InputTitleComponent,
    FabButtonComponent,
    AdminMngmtComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
      , preventDuplicates: true
    }),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    SweetAlert2Module.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DxTextBoxModule,
    DxButtonModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxTemplateModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxDateBoxModule,
    DxNumberBoxModule,
    DxLoadPanelModule,
    DxToastModule,
    DxDataGridModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
