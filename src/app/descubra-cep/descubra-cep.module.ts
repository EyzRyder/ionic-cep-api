import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescubraCEPPageRoutingModule } from './descubra-cep-routing.module';

import { DescubraCEPPage } from './descubra-cep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DescubraCEPPageRoutingModule
  ],
  declarations: [DescubraCEPPage]
})
export class DescubraCEPPageModule {}
