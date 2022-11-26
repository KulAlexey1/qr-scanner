import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QRUtils } from '@qr/utils/qr';
import { EncryptionUtils } from '@qr/utils/encryption';
import { SvgUtils } from '@qr/modules/utils/svg';
import { Constants } from '@qr/shared';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule
    ],
    selector: 'qr-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
    @ViewChild('qrcodeContainer', { static: true }) qrcodeContainerRef: ElementRef<HTMLElement>;

    dataLabel = 'Данные';

    dataPlaceholder = 'google.com';
    data = '';
    
    get dataToGenerateQR() {
        return this.data ? this.data : this.dataPlaceholder;
    }

    secretPhrase = '';
    cipherText = '';
    encryptionEnabled = false;

    dataMaxlength = Constants.qrDataMaxLength;
    secretKeyMaxlength = Constants.secretKeyMaxLength;
    cipherTextMaxlength = Constants.cipherTextMaxLength;

    constructor() { }

    ngOnInit(): void {
        this.generateCode(this.dataToGenerateQR);
    }

    onDataChange(newData: string) {
        // do ctrl + v of the same text causes cipher text change
        if (this.data === newData) {
            return;
        }

        this.data = newData;

        if (this.encryptionEnabled) {
            this.generateCipherWithCode();
        } else {
            this.generateCode(this.dataToGenerateQR);
        }
    }

    onSecretPhraseChange(newSecretPhrase: string) {
        // do ctrl + v of the same text causes cipher text change
        if (this.secretPhrase === newSecretPhrase) {
            return;
        }

        this.secretPhrase = newSecretPhrase;

        this.generateCipherWithCode();
    }

    onEncryptionToggle() {
        this.encryptionEnabled = !this.encryptionEnabled;
        
        if (this.encryptionEnabled) {
            this.generateCipherWithCode();
        } else {
            this.generateCode(this.dataToGenerateQR);
        }
    }

    onSaveQr() {
        const qrSvg = this.qrcodeContainerRef.nativeElement.querySelector('svg');

        const qrText = this.encryptionEnabled ? this.cipherText : this.dataToGenerateQR;
        const fileName = 'QR-' + qrText;
        
        SvgUtils.saveSvgAsPng(qrSvg, fileName).subscribe({
            error: (err) => console.error(err)
        });
    }

    onOpenQrInNewTab() {
        const qrSvg = this.qrcodeContainerRef.nativeElement.querySelector('svg');
        SvgUtils.openSvgInNewTab(qrSvg);
    }

    private generateCipherWithCode() {
        this.generateCipherText();
        this.generateCode(this.cipherText);
    }

    private generateCipherText() {
        const encryptedText = EncryptionUtils.encrypt(this.dataToGenerateQR, this.secretPhrase);
        const decryptedText = EncryptionUtils.decrypt(encryptedText, this.secretPhrase);

        if (decryptedText !== this.dataToGenerateQR) {
            this.cipherText = 'Не удалось зашифровать';
        } else {
            this.cipherText = encryptedText;
        }
    }

    private generateCode(data: string) {
        this.qrcodeContainerRef.nativeElement.innerHTML = QRUtils.generateCode(data);
    }
}
