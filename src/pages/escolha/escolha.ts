import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Acessorio } from '../../modelos/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;  
  public acessorios: Acessorio[];
  private _precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
    this._precoTotal = this.carro.preco;
    this.acessorios = [
      { nome: 'Freio ABS', preco: 800 },
      { nome: 'Ar-condicionado', preco: 1000 },
      { nome: 'MP3 Player', preco: 500 }  

    ];
  }

  // Responde ao evento do ion-toggle
  atualizaTotal(ativado:boolean, acessorio: Acessorio) {

    ativado ? 
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;

  }

  avancaCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this.carro,
      precoTotal: this._precoTotal
    });
  }

  // getter do atributo _precoTotal
  get precoTotal() {
    return this._precoTotal;
  }

}