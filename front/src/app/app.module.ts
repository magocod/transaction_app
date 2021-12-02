import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsDetailsComponent } from './components/transaction-details/transactions-details.component';
import { TransactionListComponent } from './components/transaction-list/transactions-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionsDetailsComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
