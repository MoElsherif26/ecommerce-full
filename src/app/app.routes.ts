import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [
  {path: "", redirectTo: "home", pathMatch: "full"},

  {path: "", component: AuthLayoutComponent, children: [
    {path: "login", loadComponent: () => import("./pages/login/login.component").then((c) => c.LoginComponent), title: "login"},
    {path: "register", loadComponent: () => import("./pages/register/register.component").then((c) => c.RegisterComponent), title: "register"}
  ]},

  {path: "", component: BlankLayoutComponent, children: [
    {path: "home", loadComponent: () => import("./pages/home/home.component").then((c) => c.HomeComponent), title: "home"},
    {path: "cart", loadComponent: () => import("./pages/cart/cart.component").then((c) => c.CartComponent), title: "cart"},
    {path: "brands", loadComponent: () => import("./pages/brands/brands.component").then((c) => c.BrandsComponent), title: "brands"},
    {path: "categories", loadComponent: () => import("./pages/categories/categories.component").then((c) => c.CategoriesComponent), title: "categories"},
    {path: "details", loadComponent: () => import("./pages/details/details.component").then((c) => c.DetailsComponent), title: "details"},

    {path: "**", loadComponent: () => import("./pages/not-found/not-found.component").then((c) => c.NotFoundComponent), title: "not-found"}
  ]},

];
