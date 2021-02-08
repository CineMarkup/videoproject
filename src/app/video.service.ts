import {Injectable} from '@angular/core';
import {VideoModel} from '../_models/video-model';
import {PlaylistModel} from '../_models/playlist-model.';
import { HttpClient } from '@angular/common/http';
import {v4 as uuid} from 'uuid';

@Injectable({
    providedIn: 'root'
})
/**
 * Video service...
 *
 * IMPORTANT: Promise in each method are added to simulate server side processing
 * Uses LocalStorage
 *
 *
 */
export class VideoService {

    constructor(private http: HttpClient) {}

    playList: PlaylistModel = {
        playlistVideos: [{
            annotation: 'What is the characters true motivation here?'
            , url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4'
            , id: uuid()
            , start: 0
            , end: 5
            , isMain: true
        }, {
            annotation: 'It looks cold'
            , url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4'
            , start: 5
            , end: 20
            , id: '84cec96f-0d1f-499d-b7ab-9d65e3cffac5'
            , isMain: false
        }, {
            annotation: 'Watch out for that flying thing!'
            , url: 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4'
            , start: 20
            , end: 30
            , id: '84cec96f-0d1f-499d-b7ab-9d65e3cffac3'
            , isMain: false
            }
        ]
    };

    getAnnotations(): any {
        return this.http.get( 'http://localhost:8080/videos/all')
        // return this.http.get( '/videos/all'); // .map(response => response.json());
    }

    getPlaylist(): Promise<PlaylistModel> {
        return new Promise(resolve => {
            if (!this.playList) {
                const fromStorage = this.getFromStorage();
                if (fromStorage) {
                    this.playList = fromStorage;
                }
            }
            resolve(this.playList);
        });
    }

    getMainVideo(): Promise<any> {
        return new Promise(resolve => {
            if (this.playList) {
                resolve(this.playList.playlistVideos.find(video => video.isMain));
            } else {
                resolve('');
            }
        });
    }

    saveMainVideo(video: VideoModel): Promise<any> {
        return new Promise(resolve => {

            return this.getMainVideo().then(mainVideo => {
                video.id = uuid();
                video.annotation = 'Main video';
                // tslint:disable-next-line:triple-equals
                if (!mainVideo || video.url != mainVideo.url) { // check if previos Main video URL is different
                    if (!this.playList) {
                        this.playList = {playlistVideos: []};
                    }
                    this.playList.playlistVideos = [video]; // CLEAN All PLAYLIST
                    this.saveToStorage();
                }
                resolve(video);
            });

        });
    }

    deleteMainVideo(): void {
        this.playList = undefined;
        // tslint:disable-next-line:no-debugger
        debugger;
        this.saveToStorage();
    }

    getVideoById(id): Promise<any> {
        return new Promise(resolve => {
            if (!this.playList) {

                this.getPlaylist().then(() => {
                    resolve(this.playList.playlistVideos.find(video => video.id === id));
                });
            } else {
                resolve(this.playList.playlistVideos.find(video => video.id === id));
            }

        });
    }

    addClip(video: VideoModel): Promise<any> {
        // @ts-ignore
        return new Promise(resolve => {
            video.id = uuid(); // this is generated in server side.

            this.playList.playlistVideos.push(video);
            this.saveToStorage();
            resolve('');
        });
    }

    updateClip(videoToUpdate: VideoModel): Promise<any> {
        return new Promise((resolve, reject) => {

            const index = this.playList.playlistVideos.findIndex(video => video.id == videoToUpdate.id);
            if (index >= 0) {
                this.playList.playlistVideos[index] = videoToUpdate;
                this.saveToStorage();
                resolve('');
            } else {
                reject('No video found with the id ' + videoToUpdate.id);
            }
            // this.playList.playlistVideos.push(video);
        });
    }

    deleteVideo(id: string): Promise<any> {
        return new Promise<void>(resolve => {
            const index = this.playList.playlistVideos.findIndex(video => video.id == id);
            this.playList.playlistVideos.splice(index, 1);

            this.saveToStorage();
            resolve();
        });
    }

    saveToStorage(): void {
        localStorage.setItem('playlist', JSON.stringify(this.playList));
    }

    getFromStorage(): any {
        const inStorage = localStorage.getItem('playlist');
        if (inStorage) {
            return JSON.parse(inStorage);
        }
    }
}
