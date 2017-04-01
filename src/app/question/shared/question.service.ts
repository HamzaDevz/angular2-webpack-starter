import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class QuestionService {
  private url: string;
  private questions: string;

  constructor(public http: Http) {
    console.log(window);
    this.url = window['apiService'].host;
    this.questions = window['apiService'].questions;
  }

  public findAll(withInterval: boolean) {
    if (withInterval) {
      return Observable.interval(15000)
          .mergeMap(() => this.get(this.questions));
    }

    return this.get(`questions`);
  }

  public findById(id: number) {
    return this.get(this.questions + '/' + id);
  }

  public create(data: Object) {
    return this.http.post(this.url + this.questions, data)
        .map((res) => res.json());
  }

  private get(path: string) {
    return this.http.get(this.url + path)
        .map((res) => res.json());
  }
}
