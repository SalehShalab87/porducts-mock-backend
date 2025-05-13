import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { ProductsDetailsComponent } from './pages/prducts-details/prducts-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'products', pathMatch: 'full'},
    {path:'products', component: ProductsComponent},
    {path:'products/:id', component: ProductsDetailsComponent},
    {path:'sign-in',component:LoginComponent},
    {path:'sign-up',component:RegisterComponent},
    {path:'profile',component:ProfileComponent},
    {path:'cart',component:CartComponent,canActivate:[authGuard]},
    {path:'checkout',component:CheckoutComponent,canActivate:[authGuard]},
    {path:'not-found',component:NotFoundComponent},
    {path:'**',redirectTo:'not-found', pathMatch:'full'}
];
