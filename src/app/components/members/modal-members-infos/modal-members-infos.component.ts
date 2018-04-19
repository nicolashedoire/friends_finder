import { Component, OnInit, Input } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-members-infos',
  templateUrl: './modal-members-infos.component.html',
  styleUrls: ['./modal-members-infos.component.css']
})
export class ModalMembersInfosComponent implements OnInit {
  @Input() member: any;

  heartActive = '';
  joinActivity = false;
  like = false;

  modalReference: NgbModalRef;
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open(content: any, options: any) {
    console.log(this.member);

    this.modalReference = this.modalService.open(content);
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
      this.like = true;
    }, 500);
  }

}
