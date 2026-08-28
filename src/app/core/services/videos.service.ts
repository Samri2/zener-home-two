import { Injectable } from '@angular/core';
import { VideoItem, videoList } from '../data/videos';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  private videos: VideoItem[] = videoList;

  getVideos(): VideoItem[] {
    return [...this.videos];
  }

  getVideoById(id: string): VideoItem | undefined {
    return this.videos.find(v => v.id === id);
  }
}

