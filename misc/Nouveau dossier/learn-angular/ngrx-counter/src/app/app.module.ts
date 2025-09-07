import { ProductModule } from './product/product.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './redux/counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { addProductReducer } from './redux/product/product.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(
      {
        count: counterReducer,
        products: addProductReducer
      }),
    ProductModule,
    // Activate DevTools for the app
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // Activate the router integration with devtools for better tracability experience ...
    // https://blog.angular-university.io/angular-ngrx-devtools/
    StoreRouterConnectingModule.forRoot({stateKey:'router'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
