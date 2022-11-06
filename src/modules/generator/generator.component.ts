import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { QRUtils } from '@qr/utils/qr';
import { EncryptionUtils } from '@qr/utils/encryption';
import { Constants } from '@qr/shared';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    selector: 'qr-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
    @ViewChild('qrcodeContainer', { static: true }) qrcodeContainerRef: ElementRef<HTMLElement>;

    dataLabel = 'Данные';

    data = '';
    secretPhrase = '';
    cipherText = '';
    encryptionEnabled = false;

    dataMaxlength = Constants.qrDataMaxLength;
    secretKeyMaxlength = Constants.secretKeyMaxLength;
    cipherTextMaxlength = Constants.cipherTextMaxLength;

    constructor() { }

    ngOnInit(): void {
        this.generateCode(this.dataLabel);
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
            this.generateCode(this.data);
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
            this.generateCode(this.data);
        }
    }

    private generateCipherWithCode() {
        this.generateCipherText();
        this.generateCode(this.cipherText);
    }

    private generateCipherText() {
        const encryptedText = EncryptionUtils.encrypt(this.data, this.secretPhrase);
        const decryptedText = EncryptionUtils.decrypt(encryptedText, this.secretPhrase);

        if (decryptedText !== this.data) {
            this.cipherText = 'Не удалось зашифровать';
        } else {
            this.cipherText = encryptedText;
        }
    }

    private generateCode(data: string) {
        this.qrcodeContainerRef.nativeElement.innerHTML = QRUtils.generateCode(data);
    }
}
