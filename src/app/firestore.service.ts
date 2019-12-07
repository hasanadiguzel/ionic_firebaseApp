import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public user: firebase.User;

  constructor(private firestore: AngularFirestore, public firebaseAuth: AngularFireAuth) 
  {
    firebaseAuth.authState.subscribe(user => { this.user = user; });
  }

  yeniKayit(kayit, user)
  {
    //return this.firestore.collection('AlisverisListesi').add(kayit);
    return this.firestore.doc<any>('kullanicilar/' + user).collection('AlisverisListesi').add(kayit);
  }

  kayitlariOku(user)
  {
    //valueChanges() ile id çekemezsin
    //return this.firestore.collection('AlisverisListesi').valueChanges();

    //snapshotChanges() metaData geriye döndürür, id verir...
    //return this.firestore.collection('AlisverisListesi').snapshotChanges();

    return this.firestore.doc<any>('kullanicilar/' + user).collection('AlisverisListesi').snapshotChanges();
  }

  kayitGuncelle(kayit_id, kayit, user)
  {
    this.firestore.doc('kullanicilar/' + user + '/AlisverisListesi/' + kayit_id).update(kayit);
  }

  kayitSil(kayit_id, user)
  {
    this.firestore.doc('kullanicilar/' + user + '/AlisverisListesi/' + kayit_id).delete();
  }

  EpostaParolaGirisYap(bilgi)
  {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(bilgi.eposta, bilgi.parola);
  }

  EpostaParolaKayitOl(bilgi)
  {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(bilgi.eposta, bilgi.parola);
  }
}
