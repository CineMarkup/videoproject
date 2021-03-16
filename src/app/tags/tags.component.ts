import {COMMA, ENTER, R} from '@angular/cdk/keycodes';
import {Component, Input, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {ActivatedRoute, Router} from '@angular/router';
import {TagModel} from 'src/_models/tag-model';
import {TagService} from '../_services/tag.service';
import {VideoService} from '../_services/video.service';
import {AiService} from '../_services/ai.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  @Input() tagsList = [];

  @Input() videoID: string;

  public selectable = true;

  public removable = true;

  public addOnBlur = true;

  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public tags = [];

  constructor(private tagService: TagService,
              private videoService: VideoService,
              private aiService: AiService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['new']) {
        this.videoService.getVideoById(this.videoID).subscribe(res => {
          console.log(' video ID ', this.videoID, 'http://localhost:8080/' + res.url);
          // const snapresponse = this.aiService.getSnapshot('http://localhost:8080/' + res.url);
          const snapresponse = this.aiService.getSnapshot('http://localhost:8080/videos/Math_video.webm');
          snapresponse.subscribe((imageres) => {
            const formDataImage = new FormData();
            formDataImage.append('image', imageres.body);
            const airesponse = this.aiService.getTags(formDataImage);
            airesponse.subscribe((tags) => {
              this.tags = this.tags + tags.results;
            });
          });
        });
      } else {
        this.tagsList.forEach((tagID, ind) => {
          this.tagService.getTagById(tagID).subscribe((tag) => {
            const val = {name: tag.text, tagID: tag.tagID};
            this.tags.push(val);
          });
        });
      }
    });
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      // add locally
      this.tags.push({name: value.trim()});

      // add to database
      const body = {text: value.trim()};
      const response = this.tagService.postTag(body);
      response.subscribe((res) => {
        const results = this.videoService.addTag(this.videoID, res.tagID);
        results.subscribe((r) => {
          console.log(r);
        });
      });
    }
    if (input) {
      input.value = '';
    }
  }

  public remove(tag: any): void {
    // remove locally
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    console.log(tag.tagID + ' ' + this.videoID);

    // remove from database
    this.videoService.deleteTagFromList(this.videoID, tag.tagID)
      .subscribe((r) => {
        console.log(r);
      });
    this.tagService.deleteTag(tag.tagID)
      .subscribe((r) => {
        console.log(r);
      });
  }
}
