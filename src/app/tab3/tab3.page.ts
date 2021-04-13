import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  urlImageStorage : string[] = [];

  constructor(
    public fotoService : FotoService
  ) { 
    
  }

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  async ionViewDidEnter() {
    await this.fotoService.loadFoto();
  }

  addPhoto() {
    this.fotoService.addPhoto();
  }

}
