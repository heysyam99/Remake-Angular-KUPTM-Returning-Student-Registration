import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from './components/login/login.component'
import { MailAddressComponent } from './components/address/mail-address/mail-address.component';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service'
import { RentAddressComponent } from './components/address/rent-address/rent-address.component'
import { FinanceComponent } from './components/finance/finance.component'
import { VerifyComponent } from './components/verify/verify.component'
import { AdminMngmtComponent } from './components/admin/admin-mngmt/admin-mngmt.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'address', component: MailAddressComponent, canActivate: [AuthGuard] },
  { path: 'rental-address', component: RentAddressComponent, canActivate: [AuthGuard] },
  { path: 'finance', component: FinanceComponent, canActivate: [AuthGuard] },
  { path: 'verify', component: VerifyComponent, canActivate: [AuthGuard] },

  // Admin
  { path: 'admin', component: AdminMngmtComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
