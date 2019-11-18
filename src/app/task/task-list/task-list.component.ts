import { Component, OnInit } from '@angular/core';
import { TaskService } from 'app/service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: any [];
  constructor(private dataService: TaskService) { }

  ngOnInit() {
    this.dataService.getTasks().subscribe(items=>{
      console.log(items);
      if(items.data == null){
        this.tasks = null;
      }else{
        this.tasks = items.data.results;
      }
    }) 
  }

}
