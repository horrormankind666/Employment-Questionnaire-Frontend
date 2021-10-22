/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๒๑/๑๐/๒๕๖๔>
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

    datasource: Schema.QuestionnaireSet[] = this.modelService.qtnSet.setListDefault();
    dataView = {
        isLoading: false
    };

    getDataSource(): void {
        this.dataView.isLoading = true;
        this.datasource = this.modelService.qtnSet.setListDefault();

        this.modelService.qtnDoneAndSet.getList()
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
        private modelService: ModelService
    ) {
    }

    qtnSet = new QuestionnaireSet(this.modelService);

    ngOnInit(): void {
        this.qtnSet.getDataSource();
    }

    getQuestionnaire(ID: string) {
        this.router.navigate(['Questionnaire/' + this.appService.getCUID([ID])]);
    }
}

