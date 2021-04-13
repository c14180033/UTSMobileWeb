import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isiData : Observable<data[]> ;
  isiDataColl : AngularFirestoreCollection<data>;

  listFoto = []
  listSelectedFoto = []
  urlImageStorage : string[] = [];

  Judul : string;
  Isi : string;
  tglNote : Date;
  rating : string;

  constructor(
    afs : AngularFirestore,
    public fotoService:FotoService,
    private afStorage : AngularFireStorage
  ) {
    this.isiDataColl = afs.collection('notes');
    this.isiData = this.isiDataColl.valueChanges();
  }

  async ngOnInit() {
    await this.fotoService.loadFoto();
    await this.loadData();
  }

  addNote() {
    this.uploadSelectedFoto();
    alert(this.listSelectedFoto);
    this.isiDataColl.doc(this.Judul).set({
      judul: this.Judul,
      isi: this.Isi,
      rating: this.rating,
      tglNote: this.tglNote.toString(),
      linkFoto: this.listSelectedFoto
    });
  }

  async loadData() {
    this.listFoto = []
    for (let idx = 0; idx < this.fotoService.dataFoto.length; idx++) {
      this.listFoto.unshift({
        webViewPath: this.fotoService.dataFoto[idx].webviewPath,
        isChecked: false
      });
    }
  }

  async uploadSelectedFoto() {
    this.urlImageStorage = []
    for (var index in this.listFoto) {
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`
      if (this.listFoto[index].isChecked == true) {
        this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[index].dataImage).then(() => {
          this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url);
            this.listSelectedFoto.unshift(url);
            console.log(url);
          });
        });
      }
    }
  }
}

interface data {
  judul : string,
  isi : string,
  rating : string,
  tglNote : string,
  linkFoto : string[]
}