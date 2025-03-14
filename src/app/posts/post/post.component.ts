import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  url: any;
  ngOnInit() {
    this.url = this.router.snapshot.paramMap.get('id');
    this.getData();
  }
  data: any;
  async getData() {
    const resp = await fetch(`https://dummyjson.com/products/${this.url}`);
    this.data = await resp.json();
    console.log(this.data);
  }
}
