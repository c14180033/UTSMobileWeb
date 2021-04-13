import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  isiData : Observable<data[]> ;
  isiDataColl : AngularFirestoreCollection<data>;

  Judul : string;
  Isi : string;
  tglNote : string;
  rating : string;

  IsiUpdt : string;
  tglNoteUpdt : string;
  ratingUpdt : string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    afs : AngularFirestore
  ) { 
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  ngOnInit() {
    this.Judul = this.activatedRoute.snapshot.paramMap.get('judulNote');
    this.Isi = this.activatedRoute.snapshot.paramMap.get('isi');
    this.tglNote = this.activatedRoute.snapshot.paramMap.get('tglNote');
    this.rating = this.activatedRoute.snapshot.paramMap.get('rating');
  }

  update(judul: string) {
    var dataUpdt = {
      isi: this.IsiUpdt,
      rating: this.ratingUpdt,
      tglNote: this.tglNoteUpdt
    }
    this.isiDataColl.doc(judul).update(dataUpdt);
  }
}

interface data {
  judul : string,
  isi : string,
  rating : string,
  tglNote : string
}