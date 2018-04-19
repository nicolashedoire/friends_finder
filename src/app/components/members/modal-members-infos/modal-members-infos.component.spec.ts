import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMembersInfosComponent } from './modal-members-infos.component';

describe('ModalMembersInfosComponent', () => {
  let component: ModalMembersInfosComponent;
  let fixture: ComponentFixture<ModalMembersInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMembersInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMembersInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
