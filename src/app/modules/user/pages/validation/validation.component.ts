import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as faceApi from '@vladmandic/face-api';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('capturedImage') capturedImage!: ElementRef;

  protected imageSrc: string = '';
  protected cameraStarted: boolean = false;

  ngOnInit(): void {
    this.loadModels();
  }

  async loadModels() {
    await faceApi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceApi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceApi.nets.faceExpressionNet.loadFromUri('/assets/models');
  }

  public async startCamera() {
    this.cameraStarted = true;
    navigator.mediaDevices
      .getUserMedia({video: {}})
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.onplaying = () => {
          this.detectSmile();
        };
      });
  }

  async detectSmile() {
    const video = this.videoElement.nativeElement;

    const interval = setInterval(async () => {
      const detection = await faceApi
        .detectSingleFace(video, new faceApi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (!detection) return;
      console.log(detection);
      if (detection.expressions.happy > 0.7) {
        this.captureImage(video);
        const stream: MediaStream = this.videoElement.nativeElement.srcObject;
        stream.getTracks().forEach((track) => track.stop());
        clearInterval(interval);
        return;
      }

    }, 100);
  }

  private captureImage(video: HTMLVideoElement) {
    const canvas = document.createElement('canvas');
    canvas.width = video.width;
    canvas.height = video.height;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    this.imageSrc = canvas.toDataURL('image/png');
  }

}
