/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๔/๑๐/๒๕๖๔>
Modify date : <๓๐/๐๖/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { Schema, ModelService } from '../../model.service';

class QuestionnaireSet {
    constructor(
        private appService: AppService,
        private authService: AuthService,
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

        let userInfo: Schema.User = Object.assign({}, this.authService.getUserInfo);
        let result: Array<Schema.QuestionnaireSet> = await this.modelService.questionnaire.doneandset.doGetList(this.appService.doGetCUID([userInfo.perPersonID, userInfo.studentCode]))

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
        private authService: AuthService,
        private modelService: ModelService
    ) {
    }

    questionnaire = {
        set: new QuestionnaireSet(this.appService, this.authService, this.modelService)
    };

    async ngOnInit(): Promise<any> {
        localStorage.removeItem(this.appService.env.localStorageKey.CUID);
        await this.questionnaire.set.getDataSource();
    }

    getQuestionnaire(
        questionnaireDoneID: string,
        questionnaireSetID: string
    ) {
        let userInfo: Schema.User = Object.assign({}, this.authService.getUserInfo);

        localStorage.setItem(this.appService.env.localStorageKey.CUID, this.appService.doGetCUID([questionnaireDoneID, questionnaireSetID, userInfo.perPersonID, userInfo.studentCode]));
        this.router.navigate(['FillOut']);
    }
}
