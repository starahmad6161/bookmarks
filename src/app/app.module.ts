import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { CheckboxDirective } from './core/directives/checkbox.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './core/models/navbar/navbar.component';
import { BtnLoadingComponent } from './core/models/btn-loading/btn-loading.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { AddClassDirective } from './core/directives/add-class.directive';
import { ConfirmComponent } from './core/models/confirm/confirm.component';
import { LoadingComponent } from './core/models/loading/loading.component';

const firebaseConfig = {
  apiKey: "AIzaSyASgNZaWgAjY48ijSEEoslqWUlh141IRo0",
  authDomain: "online-bookmarks.firebaseapp.com",
  projectId: "online-bookmarks",
  storageBucket: "online-bookmarks.appspot.com",
  messagingSenderId: "1025892699202",
  appId: "1:1025892699202:web:01179b28517872eaca71db",
  measurementId: "G-JM2FBXSPVM"
};
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CheckboxDirective,
    LoginComponent,
    NavbarComponent,
    BtnLoadingComponent,
    BookmarksComponent,
    AddClassDirective,
    ConfirmComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
