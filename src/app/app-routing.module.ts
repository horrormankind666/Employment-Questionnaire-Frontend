/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๓๐/๐๖/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { GetQuestionnaireResultResolve } from './app-routing-resolve.service';

import { PageNotFoundComponent } from './page-not-found.component';
import { QuestionnaireHomeComponent } from './questionnaire/home/questionnaire-home.component';
import { QuestionnaireFilloutComponent } from './questionnaire/fillout/questionnaire-fillout.component';
import { PrivacyPolicyHomeComponent } from './privacy-policy/home/privacy-policy-home.component';

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
        path: 'FillOut',
        component: QuestionnaireFilloutComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always',
        data: {
            signin: true,
            role: ['*'],
            hasHearderSubtitle: false
        },
        resolve: {
            questionnaire: GetQuestionnaireResultResolve
        }
    },
    {
        path: 'Home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'PrivacyPolicy',
        component: PrivacyPolicyHomeComponent,
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
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always'
    }
];
