/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๐๒/๑๑/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Schema, ModelService } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class GetQuestionnaireDataSourceResolve implements Resolve<{
    country: Schema.Country[],
    province: Schema.Province[],
    district: Schema.District[],
    subdistrict: Schema.Subdistrict[],
    doneAndSet: Schema.QuestionnaireDoneAndSet
}> {
    constructor(
        private modelService: ModelService
    ) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<{
        country: Schema.Country[],
        province: Schema.Province[],
        district: Schema.District[],
        subdistrict: Schema.Subdistrict[],
        doneAndSet: Schema.QuestionnaireDoneAndSet
    }> {
        let country: Schema.Country[] = await this.modelService.country.getList();
        let province: Schema.Province[] = await this.modelService.province.getList();
        let district: Schema.District[] = await this.modelService.district.getList();
        let subdistrict: Schema.Subdistrict[] = await this.modelService.subdistrict.getList();
        let doneAndSet: Schema.QuestionnaireDoneAndSet = await this.modelService.questionnaire.doneAndSet.get(route.params['CUID']);

        return {
            country,
            province,
            district,
            subdistrict,
            doneAndSet
        };
    }
}
