import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions?: Transaction[];
  currentTransaction: Transaction = {};
  currentIndex = -1;
  title = '';

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
    this.retrieveTransactions();
  }

  retrieveTransactions(): void {
    this.transactionService.getAll()
      .subscribe({
        next: (data) => {
          this.transactions = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveTransactions();
    this.currentTransaction = {};
    this.currentIndex = -1;
  }

  setActiveTransaction(transaction: Transaction, index: number): void {
    this.currentTransaction = transaction;
    this.currentIndex = index;
  }
}
