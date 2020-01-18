import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserFormPage } from "./user-form.page";

const routes: Routes = [
  {
    path: "",
    component: UserFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFormPageRoutingModule {}
