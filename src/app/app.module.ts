/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { JwtModule } from '@auth0/angular-jwt';

import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';

import { DynamicComponentDirective } from './app.directive';

import { appRouting } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ModalErrorComponent } from './modal/modal.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageEmptyComponent } from './page-empty.component';
import { QuestionnaireHomeComponent } from './questionnaire/home/questionnaire-home.component';
import { QuestionnaireFilloutComponent } from './questionnaire/fillout/questionnaire-fillout.component';

export function httpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        DynamicComponentDirective,
        AppComponent,
        ModalErrorComponent,
        PageNotFoundComponent,
        PageEmptyComponent,
        QuestionnaireHomeComponent,
        QuestionnaireFilloutComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        HttpClientModule,
        RouterModule.forRoot(appRouting, {
            useHash: true,
            onSameUrlNavigation: 'reload'
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
            primaryColour: '#FF0000',
            secondaryColour: '#FF0000',
            tertiaryColour: '#FF0000',
            backdropBorderRadius: '0',
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem("access_token");
                }
            }
        }),
        TableModule,
        ButtonModule,
        AvatarModule,
        OverlayPanelModule,
        DividerModule,
        TooltipModule,
        DataViewModule,
        CardModule,
        DynamicDialogModule
    ],
    exports: [
        CommonModule,
        TranslateModule
    ],
    providers: [
        DialogService
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        ModalErrorComponent
    ]
})
export class AppModule {
}
