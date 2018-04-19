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

  likeMember() {
    this.heartActive = 'active';

    setTimeout(() => {
      this.heartActive = '';
    }, 500);
  }
}
