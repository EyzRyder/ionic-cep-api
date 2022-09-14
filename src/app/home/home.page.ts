import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private formulario: FormGroup;

  dados: any;
  data: any;
  cep: any;

  @ViewChild('map')mapRef: ElementRef;
  map: GoogleMap;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private modalCtrl: ModalController,
    )
  {
    this.formulario = this.formBuilder.group({
    cep: ['', [Validators.required,Validators.nullValidator]],
  });

  }


  async enviarForm(){
  this.cep = this.formulario.value.cep;
  this.http.get(`https://viacep.com.br/ws/${this.cep}/json/`).subscribe(res=>{this.dados=res});
  this.createMap();
}

  //ionViewDidEnter(){}
  
  async createMap() {
  this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.cep}&key=${environment.mapsKey}`).subscribe(res=>this.data=res);
  if(this.data){
  const lat = this.data.results[0].geometry.location.lat;
  const lng = this.data.results[0].geometry.location.lng;
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
        lat: lat,
        lng: lng,
      },
      zoom: 15,
      },
    })
    await this.addMarkers();
  }
  }

  async addMarkers(){
    const markers: Marker[] = [
      {
        coordinate: {
          lat: -23.496572,
          lng: -46.671016,
        },
        title: 'Casa do Alek',
        snippet: 'Minha casa ae pra quem quiser roubar',
      },
      {
        coordinate: {
          lat: 33.7,
          lng: -117.2,
        },
        title: 'random place',
        snippet: 'Not sure',
      },
    ];

    const result = await this.map.addMarkers(markers);
    

    this.map.setOnMarkerClickListener(async (marker) => {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,
      });
      modal.present();
    })

  }

}
