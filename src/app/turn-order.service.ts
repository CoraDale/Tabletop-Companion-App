import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class TurnOrderService {
  private actingPosition = 0;

  private characters: Character[] = [
    { charId: 0, name: 'Monopoly: Bill', attributes: [
      { name: 'money', type: 'number', value: '1,000'}
    ]},
    { charId: 1, name: 'Dnd: Jane', attributes: [
      { name: 'health', type: 'fraction', value: '5/8'},
      { name: 'armor', type: 'number', value: '15'}
    ]},
    { charId: 2, name: 'Munchkin: Dave', attributes: [
      { name: 'level', type: 'number', value: '3'},
      { name: 'race and class', type: 'string', value: 'Dwarf Wizard'},
      { name: 'combat strength', type: 'number', value: '5'}
    ]}
  ];

  constructor() { }

  getActingPosition(): Observable<number> {
    return of(this.actingPosition);
  }

  getCharacters(): Observable<Character[]> {
    return of(this.characters);
  }
}