import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {map} from 'rxjs/operators';

declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  locations: Observable<any>;
  locationCollection: AngularFirestoreCollection<any>;
@ViewChild('map') mapElement: ElementRef;
map:any;
markers=[];

isTracking=false;
watch: string;
user=null;

  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore) {
    this.anonLogin;
  }

  ionViewWillEnter(){
    this.loadMap();
  }

  anonLogin(){
    this.afAuth.signInAnonymously().then(res =>{
      this.user=res.user;
      this.locationCollection=this.afs.collection(`locatios/${this.user.id}/track`, ref=>ref.orderBy('timestamp'));
      this.locations=this.locationCollection.snapshotChanges().pipe(
        map(actions =>
          actions.map(a=>{
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return{id,...data};
          }))
      );
      this.locations.subscribe(locations=>{
        this.updateMap(this.locations);
      })
    })
  }
  loadMap(){}
  updateMap(locations){}
  startTracking(){}
  stopTracking(){}
  addNewLocation(){}
  deleteLocation(){}

}
