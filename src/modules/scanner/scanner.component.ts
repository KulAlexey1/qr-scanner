import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NotificationService, Constants } from '@qr/shared';
import { QRUtils } from '@qr/utils/qr';
import { EncryptionUtils } from '@qr/utils/encryption';

import { catchError, delayWhen, interval, map, repeat, shareReplay, Subscription } from 'rxjs';
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
    @ViewChild('imgCanvas', {static: true}) imgCanvasRef: ElementRef<HTMLCanvasElement>;

    frontCamera = false;
    scanning: boolean;
    data = '';
    secretPhrase = '';
    cipherText = '';
    decryptionEnabled = false;
    isImgSelected = false;

    cameraStream: MediaStream;
    dataMaxLength = Constants.qrDataMaxLength;
    secretKeyMaxlength = Constants.secretKeyMaxLength;
    cipherTextMaxlength = Constants.cipherTextMaxLength;

    private playVideoSubscription: Subscription;

    constructor(
        private mediaDeviceService: MediaDeviceService,
        private notificationService: NotificationService
    ) { }

    ngOnInit(): void {
        this.startScanning();
    }

    ngOnDestroy(): void {
        this.stopCameraStream();
    }

    onRefresh() {
        this.startScanning();
        this.isImgSelected = false;
    }

    onImgSelect(event: Event) {
        const element = event.currentTarget as HTMLInputElement;
        const fileList: FileList = element.files;

        if (fileList.length == 0)
            return;

        const file = fileList[0];        
        
        const scanResult$ = QRUtils.scanCodeFromImgFile(file,
            this.imgCanvasRef.nativeElement, false);

        scanResult$.subscribe(
            (scanResult) => {
                this.setScanResult(scanResult);

                element.value = '';
                this.stopCameraStream();
                this.isImgSelected = true;
        
                if (!scanResult) {
                    this.resetDataAndCipher();
                }
            },
            (err) => this.resetDataAndCipher() 
        );
    }
    
    onDecryptionToggle() {
        this.decryptionEnabled = !this.decryptionEnabled;

        if (!this.decryptionEnabled) {
            this.data = this.cipherText;
            this.cipherText = '';
        }

        if (this.decryptionEnabled) {
            this.cipherText = this.data;
            this.setDecryptedData();
        }
    }

    onSecretPhraseChange(newSecretPhrase: string) {
        this.secretPhrase = newSecretPhrase;

        this.setDecryptedData();
    }

    private setDecryptedData() {
        const decryptedData = EncryptionUtils.decrypt(this.cipherText, this.secretPhrase);
        this.data = decryptedData ? decryptedData : 'Не удалось расшифровать';
    }

    private stopCameraStream() {
        if (this.playVideoSubscription) {
            this.playVideoSubscription.unsubscribe();
        }
    }

    private startScanning() {
        this.stopCameraStream();

        this.playVideoSubscription = this.playVideoFromCamera().pipe(
            shareReplay(1),
            map(x => {
                this.scanning = x.active;

                return this.scan();
            }),
            catchError((err) => {
                this.scanning = false;
                this.resetDataAndCipher();

                throw err;
            }),
            delayWhen((scanResult) =>
                scanResult ? interval(5000) : interval(300)),
            repeat()
        ).subscribe();
    }

    private scan() {
        const scanResult = QRUtils.scanCodeFromVideo(this.cameraVideoRef.nativeElement,
            this.cameraCanvasRef.nativeElement, true);
    
        this.setScanResult(scanResult);

        return scanResult;
    }

    private setScanResult(scanResult: string) {
        if (scanResult && this.decryptionEnabled) {
            this.cipherText = scanResult;
            this.setDecryptedData();
        }

        if (scanResult && !this.decryptionEnabled) {
            this.data = scanResult;
        }
 
        if (scanResult) {
            this.notificationService.success('QR-код отсканирован!');
        }
    }

    private resetDataAndCipher() {
        this.data = '';
        this.cipherText = '';
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

                throw err;
            })
        )
    }
}
