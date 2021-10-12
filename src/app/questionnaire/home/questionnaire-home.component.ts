/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { Schema, ModelService } from '../../model.service';

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

    dsQuestionnaireSets: Schema.QuestionnaireSet[] = [];
    loading: boolean = false;

    ngOnInit(): void {
        this.getDataSource();
    }

    getDataSource(): void {
        this.dsQuestionnaireSets = [];
        this.loading = true;

        this.modelService.questionnaireDoneAndSet.getList()
            .then((result: Schema.QuestionnaireSet[]) => {
                setTimeout(() => {
                    this.dsQuestionnaireSets = result;
                    this.loading = false;
                }, 1000);
            });
    }

    getQuestionnaire(ID: string) {
        this.router.navigate(['Questionnaire/' + this.appService.getCUID([ID])]);
    }
}

