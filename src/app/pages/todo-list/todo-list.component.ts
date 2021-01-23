import { Todo } from './../../core/interfaces/todo';
import { DbService } from './../../core/services/db.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { faCheck, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @ViewChild("todoInput") todoInput:ElementRef;
  @HostListener("click") onClick() {
    this.addNewItem();
  }

  faCheck = faCheck;
  faTimes = faTimes;
  faPlus = faPlus;

  listItems:Array<Todo> = [];
  addLoading:boolean = false;
  deleteLoading:boolean = false;
  loading:boolean = false;
  showConfirmMsg:boolean = false;
  showConfirmMsgForAll:boolean = false;
  deleteItemID:string = "";

  constructor(private _DbService:DbService) { }

  ngOnInit(): void {
    //Get All todoList
    this._DbService.getListItems("todo").subscribe((items) => {
      let listItems = items.map(item => {
        return {
          id: item.payload.doc.id,
          ...<any>item.payload.doc.data()
        }
      });
      this.listItems = listItems.sort((a, b)=> a.date - b.date);
    });
  }

  /**
   * Change Task state => complete = true/false
   * @param id => taskID
   * @param state => true or false
   */
  changeState(id, state) {
    state = !state;
    this.deleteLoading = true;
    this._DbService.changeState("todo", id, state).then(() => {
      this.deleteLoading = false;
      this.isCompleted();
    }).catch(err => {
      this.deleteLoading = false;
    });
  }
  /**
   * Show Confirm Message
   * @param itemID
   */
  deleteItemConfirm(itemID) {
    this.deleteItemID = itemID;
    this.showConfirmMsg = true;
  }
  deleteAllItemConfirm() {
    this.showConfirmMsgForAll = true;
  }
  /**
   * Delete One Item
   * @param id => Item ID
   */
  deleteItem(event) {
    this.showConfirmMsg = false;
    if (event) {
      this.deleteLoading = true;
      this._DbService.deleteItem("todo", this.deleteItemID).then(() => {
        this.deleteLoading = false;
      }).catch(err => {
        this.deleteLoading = false;
      });
    }
  }

  //Add New Todo
  addNewItem() {
    if(this.getInputValue().trim() != '') {
      //Create New Item
      let item = {
        title: this.getInputValue(),
        complete: false,
        date: new Date()
      }
      this.addLoading = true;
      this._DbService.addNewItem("todo", item).then(() => {
        this.addLoading = false;
        this.todoInput.nativeElement.value = '';
      }).catch(err => this.addLoading = false);

    }
  }
  //Return the input value
  getInputValue():string {
    return this.todoInput.nativeElement.value;
  }

  /**
   * Delete All Completed Tasks
   */
  deleteCompletedTasks(event) {
    this.showConfirmMsgForAll = false;
    if (event) {
      this.deleteLoading = true;
      this._DbService.deleteCompletedTasks().then(() => {
        this.deleteLoading = false;
      }).catch(err => this.deleteLoading = false);
    }
  }

  //Check if `listItems` has completed tasks
  isCompleted() {
    return this.listItems.some((item:any) => item.complete == true);
  }

}
