import { Component, Input, OnInit } from '@angular/core';

import { TimedSubject } from '../app.component'

@Component({
  selector: 'app-subject-editor',
  templateUrl: './subject-editor.component.html',
  styleUrls: ['./subject-editor.component.css']
})
export class SubjectEditorComponent implements OnInit {
  times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  @Input()
  timedSubject: TimedSubject;

  constructor() { }

  ngOnInit(): void {
  }

  containsTime(time: number): boolean {
    return this.timedSubject.contains(time);
  }

  toggleTime(time: number): void {
    if(this.timedSubject.contains(time)) {
      this.timedSubject.unsetAt(time);
    } else {
      this.timedSubject.setAt(time);
    }
  }
}