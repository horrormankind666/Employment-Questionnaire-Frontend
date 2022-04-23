/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๒๑/๐๔/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { Schema, ModelService } from '../../model.service';

class QuestionnaireSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.QuestionnaireSet> = this.modelService.questionnaire.set.doSetListDefault();
    dataView = {
        isLoading: false
    };

    async getDataSource(): Promise<void> {
        this.datasource = this.modelService.questionnaire.set.doSetListDefault();
        this.dataView.isLoading = true;

        let result: Array<Schema.QuestionnaireSet> = await this.modelService.questionnaire.doneandset.doGetList()

        setTimeout(() => {
            this.datasource = result;
            this.dataView.isLoading = false;
        }, 200);
    }
}

@Component({
    selector: 'app-questionnaire-home',
    templateUrl: './questionnaire-home.component.html',
    styleUrls: ['./questionnaire-home.component.scss']
})
export class QuestionnaireHomeComponent implements OnInit {
    constructor(
        private router: Router,
        public appService: AppService,
        private modelService: ModelService
    ) {
    }

    questionnaire = {
        set: new QuestionnaireSet(this.modelService)
    };

    async ngOnInit(): Promise<any> {
        localStorage.removeItem(this.appService.env.localStorageKey.CUID);
        await this.questionnaire.set.getDataSource();
    }

    getQuestionnaire(questionnaireDoneID: string, questionnaireSetID: string) {
        localStorage.setItem(this.appService.env.localStorageKey.CUID, this.appService.doGetCUID([questionnaireDoneID, questionnaireSetID]));
        this.router.navigate(['FillOut']);
    }
}
