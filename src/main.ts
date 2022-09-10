import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent, APP_ROUTES } from '@qr/modules/app';
import { SharedModule } from '@qr/shared';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
        importProvidersFrom(SharedModule),
        importProvidersFrom(BrowserAnimationsModule)
    ]
});