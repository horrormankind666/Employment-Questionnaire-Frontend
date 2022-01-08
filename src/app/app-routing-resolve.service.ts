/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๐๔/๐๑/๒๕๖๕>
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
export class GetQuestionnaireDataSourceResolve implements Resolve<{
    country: Array<Schema.Country>,
    province: Array<Schema.Province>,
    district: Array<Schema.District>,
    subdistrict: Array<Schema.Subdistrict>,
    doneAndSet: Schema.QuestionnaireDoneAndSet
}> {
    constructor(
        private appService: AppService,
        private modelService: ModelService
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<{
        country: Array<Schema.Country>,
        province: Array<Schema.Province>,
        district: Array<Schema.District>,
        subdistrict: Array<Schema.Subdistrict>,
        doneAndSet: Schema.QuestionnaireDoneAndSet
    }> {
        let country: Array<Schema.Country> = [];
        let province: Array<Schema.Province> = [];
        let district: Array<Schema.District> = [];
        let subdistrict: Array<Schema.Subdistrict> = [];
        let doneAndSet: Schema.QuestionnaireDoneAndSet = {
            done: null,
            set: null,
            section: [],
            question: [],
            answerSet: [],
            answer: []
        };

        if (this.appService.env.authenInfo.isAuthenticated) {
            doneAndSet = await this.modelService.questionnaire.doneAndSet.doGet(route.params['CUID']);

            if (doneAndSet) {
                country = await this.modelService.country.doGetList();
                province = await this.modelService.province.doGetList();
                district = await this.modelService.district.doGetList();
                subdistrict = await this.modelService.subdistrict.doGetList();
            }
        }

        return {
            country,
            province,
            district,
            subdistrict,
            doneAndSet
        };
    }
}
