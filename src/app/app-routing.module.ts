/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๑/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

export const appRouting: Routes = [
    {
        path: 'Questionnaire',
        component: QuestionnaireComponent
        /*
        canActivate: [AuthGuardService],
        data: {
            signin: true,
            role: ['*']
        },
        resolve: {
            MenuByRoleResolve
        }
        */
    },
    {
        path: '',
        redirectTo: 'Questionnaire',
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
        /*
        canActivate: [AuthGuardService],
        data: {
            role: ['*']
        },
        resolve: {
            MenuByRoleResolve
        }
        */
    }
];
