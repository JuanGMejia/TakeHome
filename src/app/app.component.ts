import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer){
    iconRegistry.addSvgIcon(
      'text-expand-arrow',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/text-expand-arrow.svg'));
    iconRegistry.addSvgIcon(
      'check',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/check.svg'));
  }
}
