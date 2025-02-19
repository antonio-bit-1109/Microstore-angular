import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volevi-eh',
  standalone: false,

  templateUrl: './volevi-eh.component.html',
  styleUrl: './volevi-eh.component.scss',
})
export class VoleviEhComponent implements AfterViewInit, OnInit {
  private router = inject(Router);

  // prendo il video dal dom tramite viewchild
  @ViewChild('videoPlayer') video: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // document.addEventListener('mouseenter', () => {
    //   this.video.nativeElement?.play();
    // });
    // // this.video.nativeElement?.load();
    // // this.video.nativeElement.play();
    // setTimeout(() => {
    //   this.router.navigateByUrl('/login');
    //   this.video.nativeElement.pause();
    // }, 9000);
  }
}
