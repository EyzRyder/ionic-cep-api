import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private formulario: FormGroup;

  cep: any;
  dados: any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

     this.formulario = this.formBuilder.group({
    cep: ['', [Validators.required, Validators.min(0)]],
  });

  }

enviarForm(){
  this.cep = this.http.get(`https://viacep.com.br/ws/${this.formulario.value.cep}/json/`).subscribe(res=>{this.dados=res});
  }

}
