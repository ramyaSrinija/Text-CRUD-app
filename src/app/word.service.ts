import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(public httpClientObj:HttpClient) { }

  addWords(wordObj):Observable<any>{
    return this.httpClientObj.post<any>("http://localhost:5000/word/addword",wordObj)
  }

  getWords():Observable<any>{
    return this.httpClientObj.get<any>("http://localhost:5000/word/getwords")
  }

  editWords(updateWord):Observable<any>{
    return this.httpClientObj.put<any>("http://localhost:5000/word/editword",updateWord)
  }

  deleteWord(id):Observable<any>{
    return this.httpClientObj.delete<any>(`http://localhost:5000/word/deleteword/${id}`)
  }
}
