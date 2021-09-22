/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๑/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { CardModule } from 'primeng/card';

import { appRouting } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        QuestionnaireComponent
    ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        HttpClientModule,
        RouterModule.forRoot(appRouting, {
            useHash: true
        }),
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpLoaderFactory,
              deps: [HttpClient]
            }
        }),
        NgxLoadingModule.forRoot({
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.4)',
            fullScreenBackdrop: true,
            animationType: ngxLoadingAnimationTypes.threeBounce,
            primaryColour: '#DD0031',
            secondaryColour: '#DD0031',
            tertiaryColour: '#DD0031',
            backdropBorderRadius: '3px',
        }),
        CardModule
    ],
    exports: [
        TranslateModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
