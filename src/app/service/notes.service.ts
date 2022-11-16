import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notelist: NoteList[] = [];
  notelist$ = new BehaviorSubject<NoteList[]>(this.notelist);

  constructor() {}

  addToNoteList(title: string, body: string) {
    let found = false;
    const note = {
      title: title,
      body: body,
    };

    this.notelist.forEach((note) => {
      if (note.title === title) {
        found = true;
      }
    });

    if (!found) {
      this.notelist = [...this.notelist, note];
      this.notelist$.next(this.notelist);

      localStorage.setItem('notelist', JSON.stringify(this.notelist));

      return null;
    }

    return 'found';
  }

  changeNote(oldtitle: string, title: string, body: string) {
    this.notelist.forEach((note) => {
      if (note.title === oldtitle) {
        if (title) {
          note.title = title;
        }
        if (body) {
          note.body = body;
        }
      }
    });

    this.notelist$.next(this.notelist);

    localStorage.setItem('notelist', JSON.stringify(this.notelist));
  }

  deleteFromNoteList(title: string) {
    this.notelist = this.notelist.filter((note) => note.title !== title);
    this.notelist$.next(this.notelist);

    localStorage.setItem('notelist', JSON.stringify(this.notelist));
  }

  getNote(title: string) {
    let result = {};
    this.notelist.map((note) => {
      if (note.title === title) {
        result = note;
      }
    });

    return result as NoteList;
  }

  clearAll() {
    this.notelist = [];
    this.notelist$.next(this.notelist);

    localStorage.setItem('notelist', JSON.stringify(this.notelist));
  }

  reload(notelist: string) {
    this.notelist = new Array(JSON.parse(notelist))[0];
    this.notelist$.next(this.notelist);
  }
}

export interface NoteList {
  title: string;
  body: string;
}
