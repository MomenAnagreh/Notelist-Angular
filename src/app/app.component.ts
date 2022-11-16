import { Component } from '@angular/core';
import { NotesService } from './service/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'notelist';

  constructor(private noteService: NotesService) {}

  ngOnInit() {
    if (localStorage.getItem('notelist')) {
      this.noteService.reload(localStorage.getItem('notelist') as string);
    }
  }
}
