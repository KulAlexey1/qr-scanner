import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NotificationService } from '@qr/shared';
import { ScanUtils } from '@qr/utils/scan';

import { catchError, delayWhen, interval, map, of, repeat, shareReplay, Subscription } from 'rxjs';
import { MediaDeviceService } from './services';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ClipboardModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule
    ],
    selector: 'qr-scanner',
    templateUrl: './scanner.component.html',
    styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, OnDestroy {
    @ViewChild('cameraVideo', {static: true}) cameraVideoRef: ElementRef<HTMLVideoElement>;
    @ViewChild('cameraCanvas', {static: true}) cameraCanvasRef: ElementRef<HTMLCanvasElement>;

    frontCamera = true;
    scanData: string;
    cameraStream: MediaStream;

    private playVideoSubscription: Subscription;

    constructor(
        private mediaDeviceService: MediaDeviceService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.startScanning();
    }

    ngOnDestroy(): void {
        if (this.playVideoSubscription) {
            this.playVideoSubscription.unsubscribe();
        }
    }

    onRefreshClick() {
        this.startScanning();
    }

    private startScanning() {
        if (this.playVideoSubscription) {
            this.playVideoSubscription.unsubscribe();
        }

        this.playVideoSubscription = this.playVideoFromCamera().pipe(
            shareReplay(1),
            map(x => this.scan()),
            delayWhen((scanResult) =>
                scanResult ? interval(5000) : interval(300)),
            repeat()
        ).subscribe();
    }

    private scan(): string {
        const scanResult = ScanUtils.scanFromVideo(this.cameraVideoRef.nativeElement,
            this.cameraCanvasRef.nativeElement);

        if (scanResult) {
            this.scanData = scanResult;

            this.notificationService.success('QR-код отсканирован!');
        }

        return scanResult;
    }

    private playVideoFromCamera() {
        return this.mediaDeviceService.getCameraStream(this.frontCamera).pipe(
            map(stream => {
                const videoElement = this.cameraVideoRef.nativeElement;
                videoElement.srcObject = stream;
                
                return stream;
            }),
            catchError((err) => {
                this.notificationService.error(`
                    Не удалось получить доступ к камере!
                    Проверьте разрешение на доступ к камере
                `);

                return of(err);
            })
        )
    }
}
