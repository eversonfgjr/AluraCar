import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AgendamentosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AgendamentosServiceProvider {

  private _url = 'http://localhost:8080/api';	

  constructor(private _http: HttpClient) {
  }

  agenda(agendamento) {
  	return this._http
  		.post(this._url+ '/agendamento/agenda', agendamento)
  		.do(()=> agendamento.enviado = true);
  }

}
