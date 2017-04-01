import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private url: string;
  private users: string;

  constructor(private http: Http) {
    this.url = window['apiService'].host;
    this.users = window['apiService'].users;
  }

  public findAll() {
    return this.get(this.users);
  }

  public findById(id: number) {
    return this.get(this.users + '/' + id);
  }

  public create(data: Object) {
    return this.http.post(this.url + this.users, data)
        .map((res) => res.json());
  }

  private get(path: string) {
    return this.http.get(this.url + path)
      .map((res) => res.json());
  }
}
