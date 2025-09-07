import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCsvParser, NgxCSVParserError, NgxCsvParserModule } from 'ngx-csv-parser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NewJoinersComponent } from './new-joiners/new-joiners.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FileUploadComponent,
    NewJoinersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,NgxCsvParserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
