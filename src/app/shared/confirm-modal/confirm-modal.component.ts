import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() title: string = '';
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter();
  @Output() onConfirmAction: EventEmitter<any> = new EventEmitter();

  closeModal() {
    this.onCloseModal.emit({ data: false });
  }

  confirmAction() {
    this.onConfirmAction.emit({ data: true });
    this.closeModal();
  }

}