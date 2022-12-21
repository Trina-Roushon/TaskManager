import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Itask } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  tasks: Itask[] = [];
  inProgress: Itask[] = [];
  done: Itask[] = [];
  myGroup!: FormGroup;

constructor(  private formbuilder: FormBuilder){
  this.ngOninit();
}

ngOninit(): void{
this.myGroup = this.formbuilder.group({
  item: ["",Validators.required]
})
this.myGroup = new FormGroup({
  item: new FormControl()
});
}

addTask(){
  this.tasks.push({
    description: this.myGroup.value.item,
    done: false
  })
}
drop(event: CdkDragDrop<Itask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}
