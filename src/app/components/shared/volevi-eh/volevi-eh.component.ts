import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volevi-eh',
  standalone: false,

  templateUrl: './volevi-eh.component.html',
  styleUrl: './volevi-eh.component.scss',
})
export class VoleviEhComponent implements AfterViewInit {
  private router = inject(Router);

  // prendo il video dal dom tramite viewchild
  @ViewChild('videoPlayer') video: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    this.video.nativeElement.load();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 9000);
  }
}
