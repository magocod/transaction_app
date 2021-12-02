import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionsDetailsComponent } from './components/transaction-details/transactions-details.component';
import { TransactionListComponent } from './components/transaction-list/transactions-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'transactions/:id', component: TransactionsDetailsComponent },
  { path: 'add', component: AddTransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
