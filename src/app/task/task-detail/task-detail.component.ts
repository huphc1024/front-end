import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from 'app/service/task.service';
import { ReportService } from 'app/service/report.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  id: number;
  issue: any;
  status: any;
  work_type: any;
  isAddReport = false;
  listReports: any = [];
  public Editor = ClassicEditor;
  addForm: FormGroup;
  submitted = false;
  isWait = false;
  isDel = false;
  length: any;
  pageSize: any;
  constructor(private router: Router, private dataService: TaskService, private route: ActivatedRoute,
    private fb: FormBuilder, private reportService: ReportService) { }

  ngOnInit() {
    this.createForm();
    let id = this.route.snapshot.paramMap.get('id');
    this.dataService.getIssuesDetail(parseInt(id)).subscribe((data: any) => {
      this.issue = data.data;
      if (this.issue.status === '0') {
        this.status = 'Open';
      } else if (this.issue.status === "1") {
        this.status = 'Inprocess';
      } else {
        this.status = 'Close';
      };
      if (this.issue.work_type == '1') {
        this.work_type = 'Task';
      } else {
        this.work_type = 'Bug';
      }
      this.reportService.getReport(1, 10, parseInt(id)).subscribe(d => {
        if (d.data != null)
          this.listReports = d.data.results;
          this.length = d.data.totalRecords;
          this.pageSize = d.data.noRecordInPage;
      })
    });

  }
  edit(id: number) {
    this.router.navigate(['/issue/edit/', id], { queryParams: { project_id: this.issue.project_id } });
  }
  createForm() {
    this.addForm = this.fb.group({
      content: ['', Validators.required]
    });
  }
  get fval() {
    return this.addForm.controls;
  }
  async onSubmit(id: number) {
    let content = this.addForm.get('content').value;
    let params = {
      content: content,
      issue_id: id
    };

    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.isWait = true;
    await this.reportService.create(params).toPromise().then(data => {
      this.isDel = true;
      this.isWait = false;
      this.isAddReport = false;
      this.reportService.getReport(1, 10, id).subscribe(d => {
        if (d.data != null)
          this.listReports = d.data.results;
          this.length = d.data.totalRecords;
          this.pageSize = d.data.noRecordInPage;
      })
      this.fval.content.setValue('');
    });
  }

  saveReport(id, index, issue_id: number) {
    let params = {
      report_id: id,
      content: this.listReports[index].content,
      del_flg: '0'
    };
    this.reportService.update(params).subscribe(
      res => {
        this.reportService.getReport(1, 10, issue_id).subscribe(items => {
          if (items.data != null) {
            this.listReports = items.data.results;
          } else {
            this.listReports = null;
          }
          this.length = items.data.totalRecords;
          this.pageSize = items.data.noRecordInPage;
          this.isDel = true;
        });
      }
    );
  }
  deleteReport(id: number, issue_id: number) {
    let txt;
    let r = confirm("Bạn có chắc chắn xóa!");
    if (r == true) {
      let params = {
        report_id: id,
        del_flg: '1'
      };
      this.reportService.update(params).subscribe(
        res => {
          this.reportService.getReport(1, 10, issue_id).subscribe(items => {
            if (items.data != null) {
              this.listReports = items.data.results;
            } else {
              this.listReports = null;
            }
            this.length = items.data.totalRecords;
            this.pageSize = items.data.noRecordInPage;
            this.isDel = true;
          });
        }
      );
    }
  }

  pageChangeEvent(event, issue_id) {
    const offset = (event.pageIndex + 1);
    const size = event.pageSize;
    this.reportService.getReport(offset, size, issue_id).subscribe(items => {
      if (items.data != null) {

      } else {
        this.listReports = null;
      }
      this.listReports = items.data.results;
      this.length = items.data.totalRecords;
      this.pageSize = items.data.noRecordInPage;
    });
  }
}
