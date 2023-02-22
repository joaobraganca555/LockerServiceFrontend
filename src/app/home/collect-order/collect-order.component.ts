import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collect-order',
  templateUrl: './collect-order.component.html',
  styleUrls: ['./collect-order.component.css']
})
export class CollectOrderComponent implements OnInit {
  token = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || '';
    console.log(this.token);
  }
}
