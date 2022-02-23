import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postjogo(data: any){
    return this.http.post<any>('http://localhost:3000/FormatodoJogo/',data)
  }
  getjogo(){
    return this.http.get<any>('http://localhost:3000/FormatodoJogo/')
  }
  putjogo(data: any, id: number){
    return this.http.put<any>('http://localhost:3000/FormatodoJogo/'+id, data)
  }
  deletejogo(id : number){
    return this.http.delete<any>('http://localhost:3000/FormatodoJogo/'+id)
  }
}
 