import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from '../../../services/activity.service';
import { AuthentificationService } from '../../../shared/security/auth.service';

@Component({
  selector: 'app-modal-members-infos',
  templateUrl: './modal-members-infos.component.html',
  styleUrls: ['./modal-members-infos.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class ModalMembersInfosComponent implements OnInit {
  @Input() member: any;

  heartActive = '';
  joinActivity = false;
  joinActivityError = false;
  joinNotAllowed = false;
  postActivity = false;
  like = false;

  modalReference: NgbModalRef;
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    config: NgbRatingConfig,
    private activityService: ActivityService,
    private authService: AuthentificationService
  ) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  open(content: any, options: any) {
    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.joinActivity = false;
        this.joinActivityError = false;
        this.postActivity = false;
        this.joinNotAllowed = false;
        this.like = false;
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

  joinMember() {
    const me = this.authService.decodeToken();
    this.activityService.join(this.member, me).subscribe(data => {
      this.postActivity = true;
      if (data.status === 'ALREADY_EXISTS') {
        this.joinActivityError = true;
      } else if (data.status === 200) {
        this.joinActivity = true;
        this.activityService.sendUpdateJoinUsers();
      } else {
        this.joinNotAllowed = true;
      }
    });
  }

  likeMember() {
    this.heartActive = 'active';

    setTimeout(() => {
      this.heartActive = '';
    }, 500);
  }
}
