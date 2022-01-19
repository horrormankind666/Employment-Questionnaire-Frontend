/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๑๐/๐๑/๒๕๖๕>
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

    datasource = this.modelService.questionnaire.set.doSetListDefault();
    dataView = {
        isLoading: false
    };

    getDataSource(): void {
        this.dataView.isLoading = true;
        this.datasource = this.modelService.questionnaire.set.doSetListDefault();

        this.modelService.questionnaire.doneandset.doGetList()
            .then((result: Array<Schema.QuestionnaireSet>) => {
                setTimeout(() => {
                    this.datasource = result;
                    this.dataView.isLoading = false;
                }, 200);
            });
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
        private modelService: ModelService,
    ) {
    }

    questionnaire = {
        set: new QuestionnaireSet(this.modelService)
    };

    ngOnInit(): void {
        this.questionnaire.set.getDataSource();
    }

    getQuestionnaire(questionnaireDoneID: string, questionnaireSetID: string) {
        this.router.navigate(['FillOut/' + this.appService.doGetCUID([questionnaireDoneID, questionnaireSetID])]);
    }
}

