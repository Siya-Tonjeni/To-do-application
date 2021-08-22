import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.models';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos: Todo[] = []
  showValidationErrors: boolean = false

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm){

    if(form.invalid) return alert(this.showValidationErrors=true)

    this.dataService.addTodo(new Todo(form.value.text))

    this.showValidationErrors 

    form.reset()
  }

  toggleCompleted(todo: Todo){
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo){
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {width: '600px', data: todo});
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.dataService.updateTodo(index,result)
      }
    })
  }

  deleteTodo(todo: Todo){
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }

}
