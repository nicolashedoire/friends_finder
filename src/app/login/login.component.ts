import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthentificationService } from '../shared/security/auth.service';
import { LocalstorageService } from '../shared/storage/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class LoginComponent implements OnInit, OnDestroy {
  userData = null;
  modalReference: NgbModalRef;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    config: NgbDropdownConfig,
    public authService: AuthentificationService,
    private localStorageService: LocalstorageService,
    private router: Router
  ) {

    // customize default values of dropdowns used by this component tree
    config.placement = 'bottom-right';
    config.autoClose = true;
  }

  ngOnInit() {
    this.refreshAvatar();
  }

  ngOnDestroy(): void {
    this.userData = null;
  }

  refreshAvatar() {
    if (this.authService.isAuthenticated()) {
      this.userData = this.authService.decodeToken();
    }
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
        this.localStorageService.setItem('jwt', data['token']);
        this.modalReference.close();
        this.authService.changeLoggedState(true);
        this.refreshAvatar();
        this.router.navigate(['/activity']);
      });
    });
  }

  logout() {
    this.authService.disconnect();
  }
}
