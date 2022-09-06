import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  faTimes = faTimes;
  faCheck = faCheck

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalComponent>,
  ) { }

  ngOnInit(): void {
  }

  handleDialog(type: string) {
    this.dialogRef.close(type)
  }

  convertDate(date:any) {
    let newDate = date.split(' ')[0];
    let month = newDate.split('-')[1];
    let day = newDate.split('-')[2];
    let year = newDate.split('-')[0];
    return new Date(year, month, day).toLocaleDateString('en-us', { month: 'long' }) + ' ' + ' ' + day + ', ' + year;
  }

}
