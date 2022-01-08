/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๕/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { GetQuestionnaireDataSourceResolve } from './app-routing-resolve.service';

import { PageNotFoundComponent } from './page-not-found.component';
import { QuestionnaireHomeComponent } from './questionnaire/home/questionnaire-home.component';
import { QuestionnaireFilloutComponent } from './questionnaire/fillout/questionnaire-fillout.component';

export const appRouting: Routes = [
    {
        path: '',
        component: QuestionnaireHomeComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
        data: {
            signin: true,
            role: ['*'],
            hasHearderSubtitle: false
        },
        resolve: {
        }
    },
    {
        path: 'FillOut/:CUID',
        component: QuestionnaireFilloutComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
        data: {
            signin: true,
            role: ['*'],
            hasHearderSubtitle: false
        },
        resolve: {
            questionnaireDataSource: GetQuestionnaireDataSourceResolve
        }
    },
    {
        path: 'Home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always'
    }
];
