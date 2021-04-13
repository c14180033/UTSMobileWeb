import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  Judul : string;
  Isi : string;
  tglNote : string;
  rating : string;

  constructor(
    private activatedRoute: ActivatedRoute,
    afs : AngularFirestore
  ) { 
    
  }

  ngOnInit() {
    this.Judul = this.activatedRoute.snapshot.paramMap.get('judulNote');
    this.Isi = this.activatedRoute.snapshot.paramMap.get('isi');
    this.tglNote = this.activatedRoute.snapshot.paramMap.get('tglNote');
    this.rating = this.activatedRoute.snapshot.paramMap.get('rating');
  }

}

interface data {
  judul : string,
  isi : string,
  rating : string,
  tglNote : string
}