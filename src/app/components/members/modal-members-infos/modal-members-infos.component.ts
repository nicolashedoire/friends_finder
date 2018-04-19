import { Component, OnInit, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

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
  like = false;

  modalReference: NgbModalRef;
  closeResult: string;

  constructor(private modalService: NgbModal, config: NgbRatingConfig) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit() {}

  open(content: any, options: any) {
    console.log(this.member);

    this.modalReference = this.modalService.open(content, { size: 'lg' });
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.joinActivity = false;
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
    this.joinActivity = true;
  }

  likeMember() {
    this.heartActive = 'active';

    setTimeout(() => {
      this.heartActive = '';
    }, 500);
  }
}
