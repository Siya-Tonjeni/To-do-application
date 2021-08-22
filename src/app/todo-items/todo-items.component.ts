import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, asNativeElements} from '@angular/core';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.models';
import { NgForm } from '@angular/forms';
import tippy from 'tippy.js';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit , AfterViewInit{

  @Input() todo: Todo = new Todo('')
  @Output() todoClicked: EventEmitter<void> = new EventEmitter()
  @Output() editClicked: EventEmitter<void> = new EventEmitter()
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter()

  @ViewChild('editBtn')
  editBtnElRef!: ElementRef<HTMLElement>;
  @ViewChild('deleteBtn')
  deleteBtnElRef!: ElementRef<HTMLElement>;
  @ViewChild('checkBtn')
  checkBtnElRef!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
     tippy(this.editBtnElRef.nativeElement,{content: 'Edit'})
     tippy(this.deleteBtnElRef.nativeElement,{content: 'Delete'})
     tippy(this.checkBtnElRef.nativeElement,{content: 'Click When Done'})
  }

  onTodoClicked(){
    this.todoClicked.emit()
  }

  onEditClicked(){
    this.editClicked.emit()
  }

  onDeleteClicked(){
    this.deleteClicked.emit()
  }

}
