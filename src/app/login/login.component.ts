import { Component, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from '../shared/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;
  userData: any;
  modalReference: NgbModalRef;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getLoggedState.subscribe(state => {
      console.log(state);
      this.isLogged = state;
    });
    this.authService.getUserData.subscribe(userData => {
      console.log(userData);
      this.userData = userData;
    });
  }

  open(content: any, options: any) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  login(provider: string) {
    this.authService.socialSignIn(provider).then(res => {
      res.subscribe(data => {
        this.modalReference.close();
        this.authService.changeLoggedState(true);
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout() {
    this.authService.disconnect();
  }
}
