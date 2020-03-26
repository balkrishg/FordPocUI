import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ProductRuleComponent } from './components/product-rule/product-rule.component';
import { CalculateIncentiveComponent } from './components/calculate-incentive/calculate-incentive.component';


const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-rule', component: ProductRuleComponent},
  {path:'calculate-incentive', component: CalculateIncentiveComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

//  const routes = Route
}
