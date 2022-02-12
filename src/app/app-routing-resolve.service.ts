/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๑๑/๐๒/๒๕๖๕>
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
    careers: Array<Schema.Career>,
    programs: Array<Schema.Program>,
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
        careers: Array<Schema.Career>,
        programs: Array<Schema.Program>,
        countries: Array<Schema.Country>,
        provinces: Array<Schema.Province>,
        districts: Array<Schema.District>,
        subdistricts: Array<Schema.Subdistrict>,
        doneandset: Schema.QuestionnaireDoneAndSet
    }> {
        let careers: Array<Schema.Career> = this.modelService.career.doSetListDefault();
        let programs: Array<Schema.Program> = this.modelService.program.doSetListDefault();
        let countries: Array<Schema.Country> = this.modelService.country.doSetListDefault();
        let provinces: Array<Schema.Province> = this.modelService.province.doSetListDefault();
        let districts: Array<Schema.District> = this.modelService.district.doSetListDefault();
        let subdistricts: Array<Schema.Subdistrict> = this.modelService.subdistrict.doSetListDefault();
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

            if (doneandset !== undefined) {
                careers = await this.modelService.career.doGetList();
                programs = await this.modelService.program.doGetList();
                countries = await this.modelService.country.doGetList();
                provinces = await this.modelService.province.doGetList();
                districts = await this.modelService.district.doGetList();
                subdistricts = await this.modelService.subdistrict.doGetList();
            }
        }

        return {
            careers,
            programs,
            countries,
            provinces,
            districts,
            subdistricts,
            doneandset
        };
    }
}
