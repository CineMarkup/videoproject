import { Component, OnInit } from '@angular/core';
import { VideoService } from '../_services/video.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {

  videos: any;

  constructor(private videoService: VideoService) { 
    this.videoService.getVideos().subscribe(
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
  
  getProfilePic(): string {
    // TODO Connect with user profile
    return 'http://gravatar.com/avatar/testing?d=identicon';
  }

  getThumbnail(v: any): string {
    return 'assets/images/' + v;
  }
}
