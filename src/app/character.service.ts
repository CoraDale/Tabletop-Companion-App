import { MessageService } from './message.service';
import { Character } from './character';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private charactersUrl = 'api/characters';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`CharacterService: ${message}`);
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.charactersUrl)
      .pipe(
        tap(characters => this.log('fetched characters')),
        catchError(this.handleError('getCharacters', []))
      );
  }

  getCharacterById(id: number ): Observable<Character> { 
    const url = `${this.charactersUrl}/${id}`;

    return this.http.get<Character>(url).pipe(
      tap(_ => this.log(`fetched character id=${id}`)),
      catchError(this.handleError<Character>(`getCharacter id=${id}`))
    ); }

  saveCharacter(): void {
    this.log('save character');
  }

  removeCharacter(): void {
    this.log('remove character');
  }

  addCharacter (character: Character): Observable<Character> {
    return this.http.post<Character>(this.charactersUrl, character, httpOptions).pipe(
      tap((character: Character) => this.log(`added character w/ id=${character.charId}`)),
      catchError(this.handleError<Character>('addCharacter'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
