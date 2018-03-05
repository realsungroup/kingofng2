import { Component, OnInit, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'web-camera',
  templateUrl: './web-camera.component.html',
  styleUrls: ['./web-camera.component.scss']
})
export class WebCameraComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() cameraImgEM = new EventEmitter();
  _nav = <any>navigator;
  _mediaStreamTrack : any;
  _imgData: any;
  constructor(private messageSev:NzMessageService) { }

  ngOnInit() { }

  ngAfterViewInit() {
    let video: any = document.getElementById('video');
    let videoObj = { "video": true };
    
    let errBack = function (error) {
      console.log("Video capture error: ", error.code);
    };
    this._nav.getUserMedia = this._nav.getUserMedia || this._nav.webkitGetUserMedia || this._nav.mozGetUserMedia || this._nav.msGetUserMedia;
    if (this._nav.getUserMedia) {
      console.log("Standarda");
      this._nav.getUserMedia(videoObj,(stream) => {
        // video.src = stream;
        this._mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, errBack);
    } else if (this._nav.webkitGetUserMedia) {
      console.log("WebKit-prefixed")
      this._nav.webkitGetUserMedia(videoObj, (stream) => {
        this._mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, errBack);
    }
    else if (this._nav.mozGetUserMedia) {
      console.log("Firefox-prefixed")
      this._nav.mozGetUserMedia(videoObj, (stream) => {
        this._mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[0];
        video.src = window.URL.createObjectURL(stream);
        video.play();
      }, errBack);
    } else if (this._nav.mediaDevices.getUserMedia) {
      console.log("navigator.mediaDevices.getUserMedia")
      var p = this._nav.mediaDevices.getUserMedia(videoObj);

      p.then((mediaStream) => {
        this._mediaStreamTrack = typeof mediaStream.stop === 'function' ? mediaStream : mediaStream.getTracks()[0];
        video.src = window.URL.createObjectURL(mediaStream);
        video.play();
        video.onloadedmetadata = function (e) {
          // Do something with the video here.
        };
      });

      p.catch(function (err) { console.log(err.name); });
    }
  }

  pause() {
    var canvas: any = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var video: any = document.getElementById('video');
    ctx.drawImage(video, 0, 0, 480, 480);
    this._imgData = canvas.toDataURL("image/png");
  }

  sureClick(){
    this.cameraImgEM.emit(this._imgData);
  }

  ngOnDestroy() {
    this._mediaStreamTrack && this._mediaStreamTrack.stop();
  }
}
