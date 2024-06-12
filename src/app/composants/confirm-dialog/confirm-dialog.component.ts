import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  @Input() message: string = 'Are you sure you want to proceed?';
  @Output() confirmed = new EventEmitter<boolean>();

  confirm(response: boolean) {
    this.confirmed.emit(response);
  }
}
