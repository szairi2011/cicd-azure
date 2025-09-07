import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  uploadURL = 'http://127.0.0.1:5000/api/fileUpload';

  constructor( private http: HttpClient ) {}

  uploadFiles( files: File[] ): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append(file.name, file);
    });
    return this.http.post(this.uploadURL, formData).pipe(
      map((res: HttpResponse<any>) => res.status),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line: typedef
  handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError('An issue happened while uploading the file(s), please try again');
  }
}
