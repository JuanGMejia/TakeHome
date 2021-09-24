import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SignUpService } from './app-service';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    SignUpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
