import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volevi-eh',
  standalone: false,

  templateUrl: './volevi-eh.component.html',
  styleUrl: './volevi-eh.component.scss',
})
export class VoleviEhComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      router.navigateByUrl('/login');
    }, 9000);
  }
}
