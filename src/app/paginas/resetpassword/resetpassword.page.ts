import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {
  
  public  email : string ='';

  constructor(private authSvc: AuthService, private router: Router) {}

  ngOnInit() {
    
  }
 
  OnsendLinkReset(){

    this.authSvc.resetPassword(this.email).then( res =>{
      this.router.navigate(['/login']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))

  }


}
