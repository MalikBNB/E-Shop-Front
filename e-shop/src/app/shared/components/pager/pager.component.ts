import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pager',
  imports: [MatPaginator],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class PagerComponent implements OnInit {
  @Input() totalCount: number;
  @Input() pageNumber: number;
  @Input() pageSize: number;
  @Output() pageChanged = new EventEmitter<PageEvent>();

  pageSizeOptions = [5, 10, 15, 20];

  constructor() {}

  ngOnInit(): void {}

  onPagerChange(event: PageEvent) {
    this.pageChanged.emit(event);
  }
}
