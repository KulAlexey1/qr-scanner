import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { QRUtils } from '@qr/modules/utils/qr';
import { Constants } from '@qr/shared';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ],
    selector: 'qr-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
    @ViewChild('qrcodeContainer', { static: true }) qrcodeContainerRef: ElementRef<HTMLElement>;

    data = '';
    dataLabel = 'Данные';
    dataMaxlength = Constants.qrDataMaxLength;

    constructor() { }

    ngOnInit(): void {
        this.generateCode(this.dataLabel);
    }

    onDataChange(newData: string) {
        this.data = newData;

        this.generateCode(this.data);
    }

    private generateCode(data: string) {
        this.qrcodeContainerRef.nativeElement.innerHTML = QRUtils.generateCode(data);
    }
}
