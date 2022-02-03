import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = getFirestore();

  getCollection(collectionName: string) {
    return new Promise(
      (resolve) => {
        getDocs(collection(this.db, collectionName))
          .then((resp) => {
            let collection: any[] = []
            resp.docs.forEach((doc) => {
              let newDoc = doc.data();
              newDoc["id"] = doc.id;
              collection.push(newDoc);
            });
            resolve(collection);
          })
      }
    );
  }

  getDoc(collectionName: string) {
    return new Promise(
      (resolve) => {
        getDocs(collection(this.db, collectionName))
        .then((resp) => {
          resp.docs.forEach((doc) => {
            let newDoc = doc.data();
            newDoc["id"] = doc.id;
            resolve(newDoc);
          });
        })
      }
    );
  }

  createDoc(collectionName: string, data: any) {
    return new Promise(
      (resolve) => {
        addDoc(collection(this.db, collectionName), data)
          .then((r) => {
            resolve(r)
          })
      }
    );
  }

  editDoc(collectionName: string, data: any) {
    return new Promise(
      (resolve) => {
        setDoc(doc(this.db, collectionName, data.id), data)
          .then((r) => {
            resolve(r)
          })
      }
    );
  }

  deleteDoc(collectionName: string, id: string) {
    return new Promise(
      (resolve) => {
        deleteDoc(doc(this.db, collectionName, id))
          .then((r) => {
            resolve(r)
          })
      }
    );
  }
}
