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

  share(platform: string) {
    let image = this.data.details['url'];
    if(platform === "fb") {
      window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(image),'sharer','toolbar=0,status=0,width=500,height=500');
      return false;
    } else {
      window.open ('https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(image)); 
      return false;
    }
  }

  convertDate(date:any) {
    let newDate = date.split(' ')[0];
    let month = newDate.split('-')[1];
    let day = newDate.split('-')[2];
    let year = newDate.split('-')[0];
    return new Date(year, month, day).toLocaleDateString('en-us', { month: 'long' }) + ' ' + ' ' + day + ', ' + year;
  }

}
