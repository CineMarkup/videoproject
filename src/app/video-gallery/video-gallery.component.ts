import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../_services/playlist.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})

export class VideoGalleryComponent implements OnInit {

  videos: any;

  constructor(private playlistService: PlaylistService) { 
    this.playlistService.getVideos().subscribe(
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

  getThumbnail(v: any): string {
    return 'assets/images/' + v;
  }
}
