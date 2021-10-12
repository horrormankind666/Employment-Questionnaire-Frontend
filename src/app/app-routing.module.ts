/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';
import { GetQuestionnaireDoneAndSetResolve } from './app-routing-resolve.service';

import { PageNotFoundComponent } from './page-not-found.component';
import { PageEmptyComponent } from './page-empty.component';
import { QuestionnaireHomeComponent } from './questionnaire/home/questionnaire-home.component';
import { QuestionnaireFilloutComponent } from './questionnaire/fillout/questionnaire-fillout.component';

export const appRouting: Routes = [
    {
        path: 'Questionnaire',
        children: [
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
                path: ':CUID',
                component: QuestionnaireFilloutComponent,
                canActivate: [AuthGuardService],
                runGuardsAndResolvers: 'always',
                data: {
                    signin: true,
                    role: ['*'],
                    hasHearderSubtitle: false
                },
                resolve: {
                    questionnaireDoneAndSet: GetQuestionnaireDoneAndSetResolve
                }
            }
        ]
    },
    {
        path: '',
        redirectTo: 'Questionnaire',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        canActivate: [AuthGuardService],
        runGuardsAndResolvers: 'always'
    }
];
