import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionService {
  private url: string;

  constructor(public http: Http) {
    this.url = 'http://hamzatei.fr/projets/lumen-rest-api/public/';
  }

  public findAll(withInterval: boolean) {
    if (withInterval) {
      return Observable.interval(15000)
          .mergeMap(() => this.get(`questions`));
    }

    return this.get(`questions`);
  }

  public findById(id: number) {
    return this.get(`questions/${id}`);
  }

  public create(data: Object) {
    return this.http.post(this.url + `questions`, data)
        .map((res) => res.json());
  }

  private get(path: string) {
    return this.http.get(this.url + path)
        .map((res) => res.json());
  }
}
