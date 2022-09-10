import { Injectable } from '@angular/core';

import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MediaDeviceService {
    getCameraStream(frontCamera: boolean) {
        const facingMode = frontCamera ? 'user' : 'environment';

        return this.getMediaStream({ video: { facingMode } });
    }

    private getMediaStream(constraints: MediaStreamConstraints) {
        return from(navigator.mediaDevices.getUserMedia(constraints));
    }
}
