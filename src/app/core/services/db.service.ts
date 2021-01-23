import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  uID = "";
  constructor(private _AngularFirestore:AngularFirestore, private _AuthService:AuthService) {
    this._AuthService.userID.subscribe(uID => {
      if (uID) {
        this.uID = uID;
      } else {
        this.uID = "";
      }
    });
  }

  createNewUser(uID, username) {
    return this._AngularFirestore.collection("users").doc(uID).set({username});
  }
  getUsername(uID) {
    return this._AngularFirestore.collection("users").doc(uID).snapshotChanges();
  }
  //For To Do
  getListItems(collName) {
    return this._AngularFirestore.collection(collName, ref => ref.where("uID", "==", this.uID)).snapshotChanges();
  }
  getListItemsFilterBy(collName, keyword) {
    return this._AngularFirestore.collection(collName, ref => ref.where("uID", "==", this.uID).where("keyword", "==", keyword)).snapshotChanges();
  }
  addNewItem(collName, item) {
    item["uID"] = this.uID;
    return this._AngularFirestore.collection(collName).add(item);
  }
  changeState(collName, id, state) {
    return this._AngularFirestore.collection(collName).doc(id).update({complete: state});
  }
  deleteItem(collName, id) {
    return this._AngularFirestore.collection(collName).doc(id).delete();
  }
  deleteCompletedTasks() {
    const db = this._AngularFirestore.firestore;
    const batch = db.batch();
    return new Promise((resolve) => {
      this._AngularFirestore.collection("todo", ref => ref.where("uID", "==", this.uID).where("complete", "==", true)).snapshotChanges().subscribe(items => {
        let allItems:Array<string> = items.map((item) => {
          return item.payload.doc.id;
        });
        for (const item of allItems) {
          let ref = db.collection("todo").doc(item);
          batch.delete(ref);
        }
        resolve(batch.commit());
      });
    });




    //let laRef = db.collection("cities").doc("LA");
    //batch.delete(laRef);
    //return this._AngularFirestore.collection("todo", ref => ref.where("complete", "==", "false")).delete();
  }

  saveEdit(itemID, item) {
    return this._AngularFirestore.collection("bookmarks").doc(itemID).update(item);
  }
}
