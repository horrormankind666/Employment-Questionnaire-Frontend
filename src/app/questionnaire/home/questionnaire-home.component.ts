/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๒๗/๑๐/๒๕๖๔>
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

    datasource = this.modelService.questionnaire.set.setListDefault();
    dataView = {
        isLoading: false
    };

    getDataSource(): void {
        this.dataView.isLoading = true;
        this.datasource = this.modelService.questionnaire.set.setListDefault();

        this.modelService.questionnaire.doneAndSet.getList()
            .then((result: Schema.QuestionnaireSet[]) => {
                setTimeout(() => {
                    this.datasource = result;
                    this.dataView.isLoading = false;
                }, 1000);
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

    getQuestionnaire(ID: string) {
        this.router.navigate(['Questionnaire/' + this.appService.getCUID([ID])]);
    }
}

