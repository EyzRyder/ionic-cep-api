import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-descubra-cep',
  templateUrl: './descubra-cep.page.html',
  styleUrls: ['./descubra-cep.page.scss'],
})
export class DescubraCEPPage implements OnInit {

  public formCEP: FormGroup;
  cep: any;
   cidade: string;
   estado: string;
   rua: string;

  mensagens = {
    cidade: [
      { tipo: 'required', mensagem: 'Campo CIDADE é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O campo CIDADE deve conter no mínimo 3 caracteres' },
    ],
    rua: [
      { tipo: 'required', mensagem: 'Campo RUA é obrigatório.' },
      { tipo: 'minlenght', mensagem: 'O campo rua deve conter no mínimo 3 caracteres' },
    ],
    erroEstado: [
      { tipo: 'required', mensagem: 'Campo ESTADO é obrigatório.' },
      { tipo: 'minlength', mensagem: 'O campo ESTADO deve conter 2 caracteres' },
      { tipo: 'maxlength', mensagem: 'O campo ESTADO deve conter 2 caracteres' },
    ],
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    ) {
    this.formCEP = this.formBuilder.group({
      estado: ['', Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(2)])],
      cidade: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
      rua: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
    });
  }

  ngOnInit() {
  }

  pesquisarCEP() {
    this.http.get(`https://viacep.com.br/ws/${this.formCEP.value.estado}/${this.formCEP.value.cidade}/${this.formCEP.value.rua}/json/`).subscribe(res=>{this.cep=res;});
  }

}
