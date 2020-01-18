import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { UserFormPageRoutingModule } from "./user-form-routing.module";
import { UserFormPage } from "./user-form.page";
import { HyrSkillsModule } from "../../components/components.module";
import { BrMaskerModule } from "br-mask";

const routes: Routes = [
  {
    path: "",
    component: UserFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserFormPageRoutingModule,
    HyrSkillsModule,
    BrMaskerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserFormPage]
})
export class UserFormPageModule {}
