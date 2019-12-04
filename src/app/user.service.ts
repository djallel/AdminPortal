import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import {Observable} from "rxjs";
import {error} from "util";

@Injectable()
export class UserService {

  private data: any;
  private observable : Observable<any>;

  constructor (private http:Http){}

  getUsers() {
    let url = "http://localhost:8080/api/user/all";
    return this.http.get(url, { withCredentials: true });
  }


  getUsers2() {
    let url = "http://localhost:8080/api/user/all";
    return this.http.get(url, { withCredentials: true }).
    _do(x => console.log(x));
  }

  getUsersFromAPI() {
    return this.http.get('app/api/users.json')
      .do(x => console.log(x))
      .map(users => users.json());
  }


  getUsersFormAPIwithCache(){
    // propriété qui servira de cache

    // les donnnées sont-elles déja en cache ?

    // oui en cache , retourner les données sous forme d'observale

    // non pas en cache, une requete est-elle en chemin ?

    //si pas de données en cache et pas de requete en cours, requete au service web
    if (this.data) { // les donnnées sont-elles déja en cache ?
      return Observable.of(this.data); // oui en cache , retourner les données sous forme d'observale
    } else if (this.observable) {  // non pas en cache, une requete est-elle en chemin ?
      return this.observable;
    } else {  //si pas de données en cache et pas de requete en cours, requete au service web
      let url = "http://localhost:8080/api/user/all";
      this.observable = this.http
        .get(url, { withCredentials: true }).
        _do(x => console.log(x))
        .map(users => { //users ou response
          this.observable = null; // il faut que notre observable soit à nouveau null
          this.data = users.json();
          return users.json();
        })
        .catch(error => { //puis on gère les eventuelles erreurs dans un CATCH
          let errorMessage = 'Une erreur ${error.status} est survenue en tentant de joindre ${error.url} ';
          return Observable.throw(errorMessage);
        });
      return this.observable; // et la fin on retourne l'obsevable quelquesoit le cas de figure
    }
  }

  getUserById(id: any){
    if(!this.data){ // si pas de donnée on retourne undefined
      return undefined;
    }
    const result = this.data.filter((user:any) => user.id === id);
    if (result.length > 0){ // sinon on retourne la donnée
      return result[0];
    }
  }

  getPrimaryTransactionList(username: string) {
    let url = "http://localhost:8080/api/user/primary/transaction?username="+username;
    return this.http.get(url, { withCredentials: true });
  }

  getSavingsTransactionList(username: string) {
    let url = "http://localhost:8080/api/user/savings/transaction?username="+username;
    return this.http.get(url, { withCredentials: true });
  }

  enableUser (username: string) {
    let url = "http://localhost:8080/api/user/"+username+"/enable";
    return this.http.get(url, { withCredentials: true });
  }

  disableUser (username: string) {
    let url = "http://localhost:8080/api/user/"+username+"/disable";
    return this.http.get(url, { withCredentials: true });
  }

}
