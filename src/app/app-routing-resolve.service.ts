/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๒๑/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Schema, ModelService } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class GetQuestionnaireDoneAndSetResolve implements Resolve<Schema.QuestionnaireDoneAndSet> {
    constructor(
        private modelService: ModelService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Schema.QuestionnaireDoneAndSet> | Promise<Schema.QuestionnaireDoneAndSet> | Schema.QuestionnaireDoneAndSet {
        return this.modelService.qtnDoneAndSet.get(route.params['CUID']).then((result: Schema.QuestionnaireDoneAndSet) => {
            return result;
        });
    }
}
