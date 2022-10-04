import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescubraCEPPage } from './descubra-cep.page';

const routes: Routes = [
  {
    path: '',
    component: DescubraCEPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescubraCEPPageRoutingModule {}
