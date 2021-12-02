import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  transaction: Transaction = {
    title: '',
  };
  submitted = false;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  saveTransaction(): void {
    const data = {
      title: this.transaction.title,
    };

    this.transactionService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newTransaction(): void {
    this.submitted = false;
    this.transaction = {
      title: '',
    };
  }

}
