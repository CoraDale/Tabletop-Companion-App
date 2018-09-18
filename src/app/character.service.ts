import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  charactersRef: AngularFireList<Character> = null;
  userID: string = firebase.auth().currentUser.uid;
  characterRef: AngularFireObject<any> = null;
  character: Character;
  characterID: string;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.userID = user.uid; }
    });
    this.charactersRef = this.db.list(`characters/${this.userID}`);
  }

  setCharacterID(key: string) {
    if (key != null) {
      this.characterID = key;
    }
  }

  getCharacterID() {
    return this.characterID;
  }

  createCharacter(character: Character): void {
    this.charactersRef = this.db.list(`characters/${this.userID}`);
    this.charactersRef.push(character).then(ref => {
      this.characterID = ref.key;
      this.setCharacterID(this.characterID);
    });
  }

  updateCharacter(character: Character): void {
    this.characterID = this.getCharacterID();
    this.characterRef = this.db.object(`characters/${this.userID}/${this.characterID}`);
    this.characterRef.update(character).catch(error => this.handleError(error));
  }

  getCharactersTracker() {
    if (!this.userID) {
      return;
    } else {
      this.charactersRef = this.db.list(`characters/${this.userID}`, ref => ref.orderByChild('tracked').equalTo(true));
      return this.charactersRef;
    }
  }

  deleteCharacter(key: string): void {
    this.charactersRef.remove(key).catch(error => this.handleError(error));
  }

  getCharactersList(): AngularFireList<Character> {
    if (!this.userID) {
      return;
    } else {
      this.charactersRef = this.db.list(`characters/${this.userID}`);
      return this.charactersRef;
    }
  }

  getCharacter(key: string) {
    this.characterRef = this.db.object(`characters/${this.userID}/${key}`);
    return this.characterRef;
  }

  deleteAll(): void {
    this.charactersRef.remove().catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
  }
}
