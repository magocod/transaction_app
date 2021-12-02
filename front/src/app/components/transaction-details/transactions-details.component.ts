import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionsDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentTransaction: Transaction = {
    title: ''
  };

  message = '';

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTransaction(this.route.snapshot.params["id"]);
    }
  }

  getTransaction(id: string): void {
    this.transactionService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTransaction = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateTransaction(): void {
    this.message = '';

    this.transactionService.update(this.currentTransaction.id, this.currentTransaction)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'transaccion editada con exito';
        },
        error: (e) => console.error(e)
      });
  }

  deleteTransaction(): void {
    this.transactionService.delete(this.currentTransaction.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/transactions']);
        },
        error: (e) => console.error(e)
      });
  }

}
