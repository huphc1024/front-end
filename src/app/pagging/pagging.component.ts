import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagging',
  templateUrl: './pagging.component.html',
  styleUrls: ['./pagging.component.scss']
})
export class PaggingComponent implements OnInit, OnChanges {

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.totalPage = Math.ceil(this.totalRecord / 20);
    this.getListPage(true);
  }

  @Input('totalRecord') totalRecord;
  @Input('currentPage') currentPage;
  @Output('eventHandler') eventHandler: EventEmitter<String> = new EventEmitter<String>();
  @Output() currentPageChange: EventEmitter<String> = new EventEmitter<String>();

  listNumberPage = [];
  totalPage = 0;
  rangerPage = 0;
  recordStart = 0;
  recordEnd = 0;
  recordOnPage = 0;
  constructor() {
    this.recordOnPage = 20;
  }

  ngOnInit() {
    this.totalPage = Math.ceil(this.totalRecord / this.recordOnPage);
    this.getListPage(true);
  }

  selectPage(page) {
    this.currentPage = page;
    this.getListPage(true);
    this.outputEvent();
  }

  nextPage() {
    this.currentPage++;
    this.getListPage(true);
    this.outputEvent();


  }

  backPage() {
    this.currentPage--;
    this.getListPage(true);
    this.outputEvent();

  }

  firstPage() {
    this.currentPage = 1;
    this.getListPage(true);
    this.outputEvent();
  }

  lastPage() {
    this.currentPage = this.totalPage;
    this.getListPage(true);
    this.outputEvent();
  }

  getListPage(appendRanger) {
    if (appendRanger) {
      this.rangerPage = Math.ceil(this.currentPage / 5) - 1;
    }

    this.listNumberPage = Array(((this.rangerPage + 1) * 5) > this.totalPage ? this.totalPage - this.rangerPage * 5 : 5).fill(0).map((x, i) => (i + 1 + this.rangerPage * 5));

    this.recordStart = (this.currentPage - 1) * this.recordOnPage + 1;
    this.recordEnd = (this.recordStart + this.recordOnPage - 1) > this.totalRecord ? this.totalRecord : this.recordStart + this.recordOnPage - 1;
  }

  isFirstPage() {
    return this.currentPage === 1;
  }

  isLastPage() {
    return this.currentPage === this.totalPage;
  }

  outputEvent() {
    this.currentPageChange.emit(this.currentPage);
    this.eventHandler.emit();
  }
}
