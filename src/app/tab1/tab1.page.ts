import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]> ;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  tglNote = new Date().toDateString();
  rating : string;

  constructor(
    afs : AngularFirestore,
  ) {
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  addNote() {
    this.isiDataColl.doc(this.Judul).set({
      judul: this.Judul,
      isi: this.Isi,
      rating: this.rating,
      tglNote: this.tglNote
    });
    
    // alert(this.rating);
  }

}

interface data {
  judul : string,
  isi : string,
  rating : string,
  tglNote : string
}