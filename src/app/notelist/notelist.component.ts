import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NoteList, NotesService } from '../service/notes.service';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css'],
})
export class NotelistComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('focusTitle') focusTitle!: ElementRef;
  disable: boolean = true;
  note: NoteList = { title: '', body: '' };

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get body(): FormControl {
    return this.form.get('body') as FormControl;
  }

  constructor(public noteService: NotesService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  onSubmit() {
    if (this.note.title) {
      alert('Note has been changed');
      this.noteService.changeNote(
        this.note.title,
        this.title.value,
        this.body.value
      );
      this.note = { title: this.title.value, body: this.body.value };
      this.disable = true;
    } else {
      if (
        this.noteService.addToNoteList(this.title.value, this.body.value) ===
        null
      ) {
        alert('Note has been added');
      } else {
        alert('This title already exist');
      }
      this.reset('', '');

      this.disable = true;
    }
  }

  focus() {
    this.reset('', '');

    this.focusTitle.nativeElement.focus();
    this.disable = true;
  }

  display(title: string) {
    this.note = this.noteService.getNote(title);
    this.reset(this.note.title, this.note.body);
    this.disable = true;
  }

  delete(title: string) {
    if (confirm('Are you sure?')) {
      this.noteService.deleteFromNoteList(title);

      if (title === this.title.value) {
        this.reset('', '');
      }

      this.disable = true;
    }
  }

  enable() {
    this.disable = false;
  }

  revert() {
    alert('Note has been reverted');
    this.reset(this.note.title, this.note.body);
    this.disable = true;
  }

  clearAll() {
    if (confirm('Are you sure?')) {
      this.noteService.clearAll();
      this.reset('', '');
      this.disable = true;
    }
  }

  reset(title: string = '', body: string = '') {
    this.title.reset(title);
    this.body.reset(body);

    if (!title && !body) {
      this.note = { title: '', body: '' };
    }
  }
}
