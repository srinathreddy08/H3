import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

// First, create a custom interface for the WebKit-specific event
export interface WebKitDeviceOrientationEvent extends DeviceOrientationEvent {
    webkitCompassHeading?: number;
  }
  
  @Component({
    selector: 'app-safety-service',
    template: `
      <div #headingIndicator class="heading-indicator"></div>
    `
  })
  export class SafetyServiceComponent implements OnInit {
    @ViewChild('headingIndicator') headingIndicator!: ElementRef;
  
    constructor() {}
  
    ngOnInit() {
      // Add event listener with the correct type
      window.addEventListener('deviceorientation', (event) => {
        this.handleDeviceOrientation(event as WebKitDeviceOrientationEvent);
      });
    }
  
    private handleDeviceOrientation(event: WebKitDeviceOrientationEvent): void {
      if (event.webkitCompassHeading !== undefined) {
        this.updateMarkerHeading(event.webkitCompassHeading);
      }
    }
  
    private updateMarkerHeading(heading: number): void {
      // Ensure the element exists and is properly typed
      if (this.headingIndicator?.nativeElement) {
        const element = this.headingIndicator.nativeElement as HTMLElement;
        element.style.transform = `translateX(-50%) rotate(${heading}deg)`;
      }
    }
  
    ngOnDestroy() {
      // Clean up event listener
      window.removeEventListener('deviceorientation', this.handleDeviceOrientation);
    }
  }