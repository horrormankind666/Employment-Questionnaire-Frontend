/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๓๐/๐๖/๒๕๖๕>
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
export class GetQuestionnaireResultResolve implements Resolve<{
    result: Schema.Questionnaire
}> {
    constructor(
        private appService: AppService,
        private modelService: ModelService
    ) {
    }

    async resolve(route?: ActivatedRouteSnapshot): Promise<{
        result: Schema.Questionnaire
    }> {
        let result: Schema.Questionnaire = {
            done: this.modelService.questionnaire.done.doSetDefault(),
            answered: this.modelService.questionnaire.answered.doSetListDefault(),
            set: this.modelService.questionnaire.set.doSetDefault(),
            sections: this.modelService.questionnaire.section.doSetListDefault(),
            questions: this.modelService.questionnaire.question.doSetListDefault(),
            answersets: this.modelService.questionnaire.answerset.doSetListDefault(),
            answers: this.modelService.questionnaire.answer.doSetListDefault()
        };

        if (this.appService.env.authenInfo.isAuthenticated)
            result = await this.modelService.questionnaire.result.doGet(localStorage.getItem(this.appService.env.localStorageKey.CUID));

        return {
            result
        };
    }
}
