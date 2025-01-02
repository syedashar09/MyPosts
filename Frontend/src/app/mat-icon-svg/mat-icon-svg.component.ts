import { Component } from '@angular/core';
import { ChangeDetectionStrategy, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

const logo = `<svg version="1.1" id="Layer_9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
<path fill-rule="evenodd" clip-rule="evenodd" fill="#EF7122" d="M475.758,473.124c-2.945,3.625-7.414,6.016-12.445,6.016
	c-8.867,0-16.062-7.195-16.062-16.079c0-4.594,1.953-8.719,5.062-11.641c17.125-17.367,27.695-41.134,27.695-67.416v-40.009V320.01
	V240c0-8.829-7.18-16-16-16h-64.009c-22.086,0-40.008-17.907-40.008-40.009v-55.986c0-53.033-42.978-96.003-95.993-96.003H127.997
	c-53.028,0-95.993,42.97-95.993,96.003V320.01v8v55.994c0,53.025,42.965,95.995,95.993,95.995h176.001
	c8.828,0,16.008,7.172,16.008,16c0,8.845-7.18,16.001-16.008,16.001H127.997C57.301,512,0,454.701,0,384.004v-256
	C0,57.299,57.301,0,127.997,0h8.004h119.997h8c70.704,0,128.001,57.299,128.001,128.004v48.001c0,8.829,7.156,15.985,16,15.985
	h64.009c22.086,0,39.992,17.922,39.992,40.009V256v56.01v71.994C512,418.7,498.164,450.076,475.758,473.124L475.758,473.124z
	 M144.001,191.99c-8.844,0-16.004-7.156-16.004-15.985c0-8.844,7.16-16,16.004-16h95.993c8.848,0,16.004,7.156,16.004,16
	c0,8.829-7.156,15.985-16.004,15.985H144.001L144.001,191.99z M127.997,335.995c0-8.829,7.16-15.985,16.004-15.985h191.99
	c8.844,0,16,7.156,16,15.985c0,8.844-7.156,16-16,16h-191.99C135.157,351.995,127.997,344.839,127.997,335.995L127.997,335.995z
	 M367.999,479.999c8.844,0,16,7.172,16,16c0,8.845-7.156,16.001-16,16.001c-8.828,0-16.008-7.156-16.008-16.001
	C351.991,487.171,359.171,479.999,367.999,479.999L367.999,479.999z"/>
</svg>`;

@Component({
  selector: 'app-mat-icon-svg',
  templateUrl: './mat-icon-svg.component.html',
  imports: [MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class MatIconSvgComponent {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);

    iconRegistry.addSvgIconLiteral(
      'logo',
      sanitizer.bypassSecurityTrustHtml(logo)
    );
  }
}
