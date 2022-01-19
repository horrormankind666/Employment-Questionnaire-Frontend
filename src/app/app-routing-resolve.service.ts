/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๑๐/๐๑/๒๕๖๕>
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
    countries: Array<Schema.Country>,
    provinces: Array<Schema.Province>,
    districts: Array<Schema.District>,
    subdistricts: Array<Schema.Subdistrict>,
    doneandset: Schema.QuestionnaireDoneAndSet
}> {
    constructor(
        private appService: AppService,
        private modelService: ModelService
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<{
        countries: Array<Schema.Country>,
        provinces: Array<Schema.Province>,
        districts: Array<Schema.District>,
        subdistricts: Array<Schema.Subdistrict>,
        doneandset: Schema.QuestionnaireDoneAndSet
    }> {
        let countries: Array<Schema.Country> = [];
        let provinces: Array<Schema.Province> = [];
        let districts: Array<Schema.District> = [];
        let subdistricts: Array<Schema.Subdistrict> = [];
        let doneandset: Schema.QuestionnaireDoneAndSet = {
            done: null,
            set: null,
            sections: [],
            questions: [],
            answersets: [],
            answers: []
        };

        if (this.appService.env.authenInfo.isAuthenticated) {
            doneandset = await this.modelService.questionnaire.doneandset.doGet(route.params['CUID']);

            if (doneandset !== undefined) {
                countries = await this.modelService.country.doGetList();
                provinces = await this.modelService.province.doGetList();
                districts = await this.modelService.district.doGetList();
                subdistricts = await this.modelService.subdistrict.doGetList();
            }
        }

        return {
            countries,
            provinces,
            districts,
            subdistricts,
            doneandset
        };
    }
}
