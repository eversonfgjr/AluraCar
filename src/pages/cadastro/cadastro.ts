import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Agendamento } from '../../modelos/agendamento';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;	
  public nome: string = '';
  public endereco: string = '';
  public email: string = '';
  public data: string = new Date().toISOString();
  private _alerta: Alert;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  private _alertCtrl : AlertController,
  			  private _agendamentoService: AgendamentosServiceProvider,
  			  private _storage: Storage) {
  	
  	this.carro = this.navParams.get('carroSelecionado');
  	this.precoTotal = this.navParams.get('precoTotal');
  }

  agenda(){
  	
  	if(!this.nome || !this.endereco || !this.email) {

  		this._alertCtrl.create({
  			title: 'Preenchimento Obrigatorio',
  			subTitle: 'Preencha todos os campos',
  			buttons: [
  				{ text: 'ok'}
  			]
  		}).present();

  		return;
  	}

  	let agendamento: Agendamento = {
  		nomeCliente: this.nome,
  		enderecoCliente: this.endereco,
  		emailCliente: this.email,
  		modeloCarro: this.carro.nome,
  		precoTotal: this.precoTotal,
  		confirmado: false,
  		enviado: false
  	};

  	// Inicialmente a criação do alerta havia sido desenvolvido no construtor dessa classe,
  	// mas o Controller é destruído após o usuário clicar no botão 'ok', e portanto, quando,
  	// o usuário tentava agendar pela segunda vez, uma exceção era estourada
  	this._alerta = this._alertCtrl.create({
		title: 'Aviso',
		// o handler diz o que o objeto vai fazer quando ele for acionado
		buttons: [
			{ text: 'ok', 
			handler: () => {
				this.navCtrl.setRoot(HomePage);
			}}
		]
	});

  	let mensagem = '';

  	this._agendamentoService.agenda(agendamento)
  		.mergeMap(() => this.salva(agendamento))
  		.finally(
  			() => {
  				this._alerta.setSubTitle(mensagem);	
  				this._alerta.present();
  			}
  		)
  		.subscribe(
	  		() => {
	  			mensagem = 'Agendamento realizado!';
	  			
	  		},
	  		() => {
	  			mensagem = 'Falha no agendamento! Tente novamente mais tarde!';
	  		}
  		)
  	;
  }

  salva(agendamento){
  	// O substr é para pegar apenas o dia, mes e ano, descartando hora, minuto e segundo
  	let chave = this.email + this.data.substr(0,10);
  	// o método set do Storage retorna uma promisse ( padrão Javascript)
  	let promisse = this._storage.set(chave, agendamento);
    // transformar uma promisse em uma observable do rxJS
    return Observable.fromPromise(promisse);	
  }
  
}
