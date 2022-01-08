/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๐๗/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { AppService } from './app.service';

export namespace Schema {
    export interface Any {
        [key: string]: any;
    }

    export interface BearerToken {
        CUID: string,
        token: string
    }

    export interface InputType {
        inputType: string,
        name: string,
        type: string,
        length?: number,
        mode?: string,
        decimalPoint?: number,
        useGrouping?: boolean,
        mask?: string,
        items?: Array<QuestionnaireAnswer>,
        value?: any
    }

    export interface Condition {
        column: string,
        operator: string,
        value: any
    }

    export interface User {
        PPID: string,
        email?: string,
        accountName?: string,
        givenName?: string,
        familyName?: string,
        initials?: string
        perPersonID: string | null,
        studentCode: string | null,
        IDCard: string | null,
        titlePrefix: any,
        firstName: any,
        middleName: any,
        lastName: any,
        instituteName: any,
        facultyID: string | null,
        facultyCode: string | null,
        facultyName: any,
        programID: string | null,
        programCode: string | null,
        majorCode: string | null,
        groupNum: string | null,
        degreeLevelName: any,
        programName: any,
        degreeName: any,
        branchID: string | null,
        branchName: any,
        classYear: number | null,
        yearEntry: string | null,
        gender: string,
        birthDate: string | null,
        nationalityName: any,
        nationality2Letter: string | null,
        nationality3Letter: string | null,
        raceName: any,
        race2Letter: string | null,
        race3Letter: string | null
    }

    export interface Country {
        ID: string,
        name: any,
        isoCountryCodes2Letter: string,
        isoCountryCodes3Letter: string
    }

    export interface Province {
        ID: string,
        country: {
            ID: string,
            isoCountryCodes3Letter: string
        },
        name: any,
        regional: string
    }

    export interface District {
        ID: string,
        country: {
            ID: string,
            isoCountryCodes3Letter: string
        },
        province: {
            ID: string,
            name: any

        },
        name: any,
        zipCode: string
    }

    export interface Subdistrict {
        ID: string,
        country: {
            ID: string,
            isoCountryCodes3Letter: string
        },
        province: {
            ID: string,
            name: any
        },
        district: {
            ID: string,
            name: any,
            zipCode: string
        },
        name: any
    }

    export interface QuestionnaireDone {
        ID?: string | null,
        empQuestionnaireSetID?: string | null,
        userInfo: Schema.User,
        empQuestionnaireAnswer?: any,
        submitStatus?: string,
        cancelStatus?: string,
        actionDate?: string
    }

    export interface QuestionnaireSet {
        ID: string,
        year: number,
        name: any,
        description: any,
        notice: any,
        showStatus: string,
        cancelStatus: string,
        empQuestionnaireDoneID: string,
        submitStatus: string,
        doneDate: string,
        actionDate: string
    }

    export interface QuestionnaireSection {
        ID: string,
        empQuestionnaireSetID: string,
        no: number,
        titleName: any,
        name: any,
        disableStatus: string,
        actionDate: string
    }

    export interface QuestionnaireQuestion {
        ID: string,
        empQuestionnaireSectionID: string,
        no: number,
        name: any,
        description: any,
        condition: any,
        disableStatus: string,
        errorStatus: string,
        actionDate: string
    }

    export interface QuestionnaireAnswerSet {
        ID: string,
        empQuestionnaireQuestionID: string,
        no: number,
        titleName: any,
        inputType: InputType,
        actionDate: string
    }

    export interface QuestionnaireAnswer {
        ID: string,
        empQuestionnaireAnswerSetID: string,
        empQuestionnaireAnswerID?: string,
        no: number,
        choiceOrder: string,
        name: any,
        description: any,
        inputType: InputType,
        specify: Array<InputType>,
        eventAction: any,
        actionDate: string
    }

    export interface QuestionnaireDoneAndSet {
        done: QuestionnaireDone | null,
        set: QuestionnaireSet | null,
        section: Array<QuestionnaireSection>,
        question: Array<QuestionnaireQuestion>,
        answerSet: Array<QuestionnaireAnswerSet>,
        answer: Array<QuestionnaireAnswer>
    }
}

namespace Instance {
    export class Any {
        doSetDefault(): Schema.Any {
            return {};
        }
    }

    export class Country {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'Country';

        doSetListDefault(): Array<Schema.Country> {
            return [];
        }

        doSetDefault(): Schema.Country | null {
            return null;
        }

        async doGetList(): Promise<Array<Schema.Country>> {
            try {
                let ds: Array<Schema.Country> = await this.appService.doGetDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }
    }

    export class Province {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'Province';

        doSetListDefault(): Array<Schema.Province> {
            return [];
        }

        doSetDefault(): Schema.Province | null {
            return null;
        }

        async doGetList(): Promise<Array<Schema.Province>> {
            try {
                let ds: Array<Schema.Province> = await this.appService.doGetDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }
    }

    export class District {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'District';

        doSetListDefault(): Array<Schema.District> {
            return [];
        }

        doSetDefault(): Schema.District | null {
            return null;
        }

        async doGetList(): Promise<Array<Schema.District>> {
            try {
                let ds: Array<Schema.District> = await this.appService.doGetDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }
    }

    export class Subdistrict {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'Subdistrict';

        doSetListDefault(): Array<Schema.Subdistrict> {
            return [];
        }

        doSetDefault(): Schema.Subdistrict | null {
            return null;
        }

        async doGetList(): Promise<Array<Schema.Subdistrict>> {
            try {
                let ds: Array<Schema.Subdistrict> = await this.appService.doGetDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }
    }

    export class QuestionnaireDoneAndSet {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'DoneAndSet';

        doSetListDefault(): Array<Schema.QuestionnaireDoneAndSet> {
            return [];
        }

        async doGetList(): Promise<Array<Schema.QuestionnaireSet>> {
            try {
                let ds: Array<Schema.QuestionnaireSet> = await this.appService.doGetDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }

        async doGet(CUID: string): Promise<Schema.QuestionnaireDoneAndSet> {
            let query = [
                '',
                CUID
            ].join('/');

            try {
                let ds: Array<Schema.QuestionnaireDoneAndSet> = await this.appService.doGetDataSource(this.routePrefix, 'get', query, true);

                return ds[0];
            }
            catch(error) {
                console.log(error);

                return this.doSetListDefault()[0];
            }
        }
    }

    export class QuestionnaireDone {
        doSetDefault(): Schema.QuestionnaireDone | null {
            return null;
        }
    }

    export class QuestionnaireSet {
        doSetListDefault(): Array<Schema.QuestionnaireSet> {
            return [];
        }

        doSetDefault(): Schema.QuestionnaireSet | null {
            return null;
        }
    }

    export class QuestionnaireSection {
        doSetListDefault(): Array<Schema.QuestionnaireSection> {
            return [];
        }
    }

    export class QuestionnaireQuestion {
        doSetListDefault(): Array<Schema.QuestionnaireQuestion> {
            return [];
        }
    }

    export class QuestionnaireAnswerSet {
        doSetListDefault(): Array<Schema.QuestionnaireAnswerSet> {
            return [];
        }
    }

    export class QuestionnaireAnswer {
        doSetListDefault(): Array<Schema.QuestionnaireAnswer> {
            return [];
        }
    }
}


@Injectable({
    providedIn: 'root'
})
export class ModelService {
    constructor(
        private appService: AppService
    ) {
    }

    any = new Instance.Any();
    country = new Instance.Country(this.appService);
    province = new Instance.Province(this.appService);
    district = new Instance.District(this.appService);
    subdistrict = new Instance.Subdistrict(this.appService);
    questionnaire = {
        doneAndSet: new Instance.QuestionnaireDoneAndSet(this.appService),
        done: new Instance.QuestionnaireDone(),
        set: new Instance.QuestionnaireSet(),
        section: new Instance.QuestionnaireSection(),
        question: new Instance.QuestionnaireQuestion(),
        answerSet: new Instance.QuestionnaireAnswerSet(),
        answer: new Instance.QuestionnaireAnswer()
    }
}
