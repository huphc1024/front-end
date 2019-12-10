import {MatPaginatorIntl} from '@angular/material';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();  

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

      this.itemsPerPageLabel = "Số mục trên trang";
      this.nextPageLabel = "Trang tiếp theo";
      this.previousPageLabel = "Trang trước";
      this.changes.next();

  }
}