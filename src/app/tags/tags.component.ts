import {COMMA, ENTER, R} from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { TagModel } from 'src/_models/tag-model';
import { TagService } from '../_services/tag.service';
import { VideoService } from '../_services/video.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() tagsList = [];

  @Input() videoID: string;

  visible = true;

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags = [];

  constructor(private tagService: TagService, private videoService: VideoService) {
  }

  ngOnInit(): void {
    this.tagsList.forEach((tagID, ind) => {
      console.log(tagID);
      this.tagService.getTagById(tagID).subscribe((tag) => {
        const val = { name: tag.text };
        console.log(val);
        this.tags.push(val);
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      // add locally
      this.tags.push({name: value.trim()});

      // add to database
      const body = { text: value.trim()};
      const response = this.tagService.postTag(body);
      response.subscribe((res) => {
        const results = this.videoService.pushTag(this.videoID, res.tagID);
        results.subscribe((r) => {
          console.log(r);
        });
      });
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag: any): void {
    // TODO remove from db
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
