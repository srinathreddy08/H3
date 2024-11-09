import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DangerArea } from './interfaces/danger-area.model';

@Injectable({
  providedIn: 'root'
})
export class DangerAreaService {
  private apiUrl = 'http://localhost:8090/api/safety/danger-areas';

  constructor(private http: HttpClient) {}

  getDangerAreas(): Observable<DangerArea[]> {
    return this.http.get<DangerArea[]>(this.apiUrl);
  }

  addDangerArea(dangerArea: DangerArea): Observable<DangerArea> {
    return this.http.post<DangerArea>(this.apiUrl, dangerArea);
  }
}
