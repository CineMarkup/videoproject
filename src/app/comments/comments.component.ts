import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments: any;

  public searchText = '';

  constructor() {}

  ngOnInit(): void {}

  public addComment() {
    console.log('adding comment');
  }

  public onSearchComment(event: any): void {
    this.comments.forEach(comment => {
      const filter = event.target.value.toUpperCase();
      const text = comment.text;
      if (text.toUpperCase().indexOf(filter) > -1) {
        comment.display = '';
      }
      else {
        comment.display = 'none';
      }
    });
  }

}
