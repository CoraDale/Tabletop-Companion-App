import { CharacterDetailsComponent } from './character-details/character-details.component';
import { AppMasterPageComponent } from './app-master-page/app-master-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { environment } from 'environments/environment';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CharacterListComponent } from './character-list/character-list.component';
import { TrackerComponent } from './tracker/tracker.component';
import { MessagesComponent } from './messages/messages.component';
import { CharacterListEntryComponent } from './character-list-entry/character-list-entry.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreModule } from './core/core.module';
import { RegisterComponent } from './register/register.component';
import { CharDAttributeListEntryComponent } from './char-d-attribute-list-entry/char-d-attribute-list-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    TrackerComponent,
    MessagesComponent,
    CharacterListEntryComponent,
    UserProfileComponent,
    RegisterComponent,
    CharDAttributeListEntryComponent,
    AppMasterPageComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // for database
    CoreModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
