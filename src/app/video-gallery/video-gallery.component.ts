import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../_services/playlist.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {

  public videos: any;

  constructor(private playlistService: PlaylistService) { 
    this.playlistService.getPlaylists().subscribe(
      result => {
        if (result) {
          this.videos = result;
          console.log(this.videos)
        }
      },
      (err) => { console.log('ERROR ' + err); },
    );
  }

  ngOnInit(): void {
  }

  public getThumbnail(thumbnail: any): string {
    if (thumbnail) {
      return 'assets/images/' + thumbnail;
    }
    else{ 
      return 'assets/images/Default.PNG';
    }
  }

  public getDescription(video: any): string {
    if (video.description) {
      return video.description;
    }
    else{ 
      return 'Make sure to add a description to help users better understand your content.';
    }
  }

}
