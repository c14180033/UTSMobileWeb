import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  isiData : Observable<data[]> ;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  tglNote = new Date().toDateString();
  rating : string;

  constructor(
    afs : AngularFirestore,
    private router: Router
  ) {
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  ngOnInit() {
    
  }

  goDetail(judul: string, isi: string, rating: string, tglNote: string) {
    this.router.navigate(['/detail', judul, isi, rating, tglNote]);
  }

  update(judul: string) {
    var dataUpdt = {
      judul: this.Judul,
      isi: this.Isi
    }
    this.isiDataColl.doc(judul).update(dataUpdt);
  }

  delete(judul: string) {
    this.isiDataColl.doc(judul).delete();
  }
}

interface data {
  judul : string,
  isi : string,
  rating : string,
  tglNote : string
}