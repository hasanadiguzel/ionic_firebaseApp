# ionic_firebaseApp

https://github.com/angular/angularfire

https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md

>ionic start appName blank

>ionic serve

>npm install @angular/cli

src>environment>environment.ts: firebase settings add (firebase: {...})

src>app>app.module.ts: 

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

	imports add;
	
AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule

>ionic g: service (name: firestore)

src>firestore.service.ts:

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

	imports add;
	
private firestore: AngularFirestore, public firebaseAuth: AngularFireAuth
