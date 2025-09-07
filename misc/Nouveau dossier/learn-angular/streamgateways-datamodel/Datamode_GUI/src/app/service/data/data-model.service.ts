import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataModelService {

  dataModel: DatamodelBean = new DatamodelBean;
  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`http://localhost:8080/datamodel/middleoffice/LDM/full`);
  }

  fetchData(url:string){
    return this.http.get(url);
  }

  updateData(modelId: any, dataModel: DatamodelBean) {
    return this.http.put(`http://localhost:8080/datamodel/middleoffice/LDM/${modelId}`
      , dataModel)
  }
  deleteData(id: any) {
    return this.http.delete(`http://localhost:8080/datamodel/middleoffice/LDM/${id}`)
  }
  saveData(attribute:string){
    return this.http.post(`http://localhost:8080/datamodel/middleoffice/LDM/${attribute}`,[]).subscribe(
      data => {
        alert("Saved");
      });
  }
}
export class DatamodelBean {
  attribute = '';
  type = '';
  internal = '';
  fixmlMapping = '';
  format = '';
  fixTag = '';
  description = '';
}
