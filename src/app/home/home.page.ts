import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  kayitlar: any;
  urun: string;
  adet: number;
  kisi: string;
  userID: string;

  constructor(private servis: FirestoreService, private afAuth: AngularFireAuth, private router: Router) 
  {
    //uyuglmaa çalıştığı sürece bağlı kalsın: subscribe()
    //servis.kayitlariListele().subscribe(sonuc => { this.kayitlar = sonuc; console.log(sonuc); }, error => { console.log(error); });
    
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        console.log(this.userID);
        this.listele();
      } else {
        this.router.navigateByUrl('/login');
      }
    });
  }

  listele()
  {
    this.servis.kayitlariOku(this.userID).subscribe(data => { this.kayitlar = data; console.log(data); }, error => {});
  }
  
  yeniKayit()
  {
    let kayit = {};
    kayit['urun'] = this.urun;
    kayit['adet'] = this.adet;
    kayit['kisi'] = this.kisi;

    this.servis.yeniKayit(kayit, this.userID).then(sonuc => {
      this.urun = null;
      this.adet = undefined;
      this.kisi = null;
      console.log(sonuc);
    })
      .catch(error => {
        console.log(error);
      });
  }

  kayitDuzenle(kayit) {
    kayit.guncelleniyor = true;
    kayit.gUrun = kayit.payload.doc.data().urun;
    kayit.gAdet = kayit.payload.doc.data().adet;
    kayit.gKisi = kayit.payload.doc.data().kisi;
  }

  kayitGuncelle(secilenKayit) {
    let kayit = {};
    kayit['urun'] = secilenKayit.gUrun;
    kayit['adet'] = secilenKayit.gAdet;
    kayit['kisi'] = secilenKayit.gKisi;
    this.servis.kayitGuncelle(secilenKayit.payload.doc.id, kayit, this.userID);
    secilenKayit.guncelleniyor = false;
  }

  kayitSil(id) {
    this.servis.kayitSil(id, this.userID);
  }

  cikisYap() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');
  }
}
