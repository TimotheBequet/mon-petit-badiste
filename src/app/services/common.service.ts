import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private subjectName = new Subject<any>();
  
  sendUpdate(subject: any) {
    this.subjectName.next({data: subject});
  }

  getUpdate(): Observable<any> {
    return this.subjectName.asObservable();
  }
}
