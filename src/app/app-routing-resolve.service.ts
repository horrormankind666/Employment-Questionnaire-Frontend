/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๒๑/๐๔/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { Schema, ModelService } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class GetQuestionnaireDoneAndSetResolve implements Resolve<{
    doneandset: Schema.QuestionnaireDoneAndSet
}> {
    constructor(
        private appService: AppService,
        private modelService: ModelService
    ) {
    }

    async resolve(route?: ActivatedRouteSnapshot): Promise<{
        doneandset: Schema.QuestionnaireDoneAndSet
    }> {
        let doneandset: Schema.QuestionnaireDoneAndSet = {
            done: this.modelService.questionnaire.done.doSetDefault(),
            set: this.modelService.questionnaire.set.doSetDefault(),
            sections: this.modelService.questionnaire.section.doSetListDefault(),
            questions: this.modelService.questionnaire.question.doSetListDefault(),
            answersets: this.modelService.questionnaire.answerset.doSetListDefault(),
            answers: this.modelService.questionnaire.answer.doSetListDefault()
        };

        if (this.appService.env.authenInfo.isAuthenticated) {
            let doneandsetCUID: string | null = localStorage.getItem(this.appService.env.localStorageKey.CUID);

            doneandset = await this.modelService.questionnaire.doneandset.doGet(doneandsetCUID !== null ? doneandsetCUID : '');
        }

        return {
            doneandset
        };
    }
}
