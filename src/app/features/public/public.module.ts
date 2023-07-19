import {NgModule} from "@angular/core";

import {PublicRoutingModule} from "./public-routing.module";
import {CommonModule} from "@angular/common";
import {PublicComponent} from "./public.component";

@NgModule({
  declarations: [
    PublicComponent
  ],
  imports: [
    PublicRoutingModule,
    CommonModule,
  ],
})
export class PublicModule{}
