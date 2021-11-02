/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๐๒/๑๑/๒๕๖๔>
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

    export interface User {
        PPID: string,
        givenName: string,
        familyName: string,
        email: string,
        initials: string
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
        ID: string,
        empQuestionnaireSetID: string,
        PPID: string,
        perPersonID: string,
        studentCode: string,
        titlePrefix: any,
        firstName: any,
        middleName: any,
        lastName: any,
        instituteName: any,
        facultyID: string,
        facultyCode: string,
        facultyName: any,
        programID: string,
        programCode: string,
        majorCode: string,
        groupNum: string,
        degreeLevelName: any,
        programName: any,
        degreeName: any,
        branchID: string,
        branchName: any,
        classYear: number,
        yearEntry: string,
        gender: string,
        birthDate: string,
        nationalityName: any,
        nationality2Letter: string,
        nationality3Letter: string,
        raceName: any,
        race2Letter: string,
        race3Letter: string,
        address: any,
        empQuestionnaireAnswer: any,
        cancelStatus: string,
        actionDate: string
    }

    export interface QuestionnaireSet {
        ID: string,
        year: number,
        name: any,
        description: any,
        notice: any,
        showStatus: string,
        cancelStatus: string,
        doneStatus: string,
        doneDate: string,
        actionDate: string
    }

    export interface QuestionnaireSection {
        ID: string,
        empQuestionnaireSetID: string,
        no: number,
        titleName: any,
        name: any,
        actionDate: string
    }

    export interface QuestionnaireQuestion {
        ID: string,
        empQuestionnaireSectionID: string,
        no: number,
        name: any,
        description: any,
        condition: any,
        actionDate: string
    }

    export interface QuestionnaireAnswerSet {
        ID: string,
        empQuestionnaireQuestionID: string,
        no: number,
        titleName: any,
        inputType: string,
        actionDate: string
    }

    export interface QuestionnaireAnswer {
        ID: string,
        empQuestionnaireAnswerSetID: string,
        no: number,
        choiceOrder: string,
        name: any,
        description: any,
        inputType: string,
        specify: string,
        gotoSection: string,
        actionDate: string
    }

    export interface QuestionnaireDoneAndSet {
        done: QuestionnaireDone | null,
        set: QuestionnaireSet | null,
        section: QuestionnaireSection[],
        question: QuestionnaireQuestion[],
        answerSet: QuestionnaireAnswerSet[],
        answer: QuestionnaireAnswer[]
    }
}

namespace Instance {
    export class Any {
        setDefault(): Schema.Any {
            return {};
        }
    }

    export class Country {
        constructor(
            private appService: AppService
        ) {
        }

        private routePrefix: string = 'Country';

        setListDefault(): Schema.Country[] {
            return [];
        }

        setDefault(): Schema.Country | null {
            return null;
        }

        async getList(): Promise<Schema.Country[]> {
            try {
                let ds: Schema.Country[] = await this.appService.getDataSource(this.routePrefix, 'getlist', '', true);

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

        setListDefault(): Schema.Province[] {
            return [];
        }

        setDefault(): Schema.Province | null {
            return null;
        }

        async getList(): Promise<Schema.Province[]> {
            try {
                let ds: Schema.Province[] = await this.appService.getDataSource(this.routePrefix, 'getlist', '', true);

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

        setListDefault(): Schema.District[] {
            return [];
        }

        setDefault(): Schema.District | null {
            return null;
        }

        async getList(): Promise<Schema.District[]> {
            try {
                let ds: Schema.District[] = await this.appService.getDataSource(this.routePrefix, 'getlist', '', true);

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

        setListDefault(): Schema.Subdistrict[] {
            return [];
        }

        setDefault(): Schema.Subdistrict | null {
            return null;
        }

        async getList(): Promise<Schema.Subdistrict[]> {
            try {
                let ds: Schema.Subdistrict[] = await this.appService.getDataSource(this.routePrefix, 'getlist', '', true);

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

        private routePrefix: string = 'Questionnaire/DoneAndSet';

        setListDefault(): Schema.QuestionnaireDoneAndSet[] {
            return [];
        }

        async getList(): Promise<Schema.QuestionnaireSet[]> {
            try {
                let ds: Schema.QuestionnaireSet[] = await this.appService.getDataSource(this.routePrefix, 'getlist', '', true);

                return ds;
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }

        async get(CUID: string): Promise<Schema.QuestionnaireDoneAndSet> {
            let query = [
                '',
                CUID
            ].join('/');

            try {
                let ds: Schema.QuestionnaireDoneAndSet[] = await this.appService.getDataSource(this.routePrefix, 'get', query, true);

                return ds[0];
            }
            catch(error) {
                console.log(error);

                return this.setListDefault()[0];
            }
        }
    }

    export class QuestionnaireSet {
        setListDefault(): Schema.QuestionnaireSet[] {
            return [];
        }

        setDefault(): Schema.QuestionnaireSet | null {
            return null;
        }
    }

    export class QuestionnaireSection {
        setListDefault(): Schema.QuestionnaireSection[] {
            return [];
        }
    }

    export class QuestionnaireQuestion {
        setListDefault(): Schema.QuestionnaireQuestion[] {
            return [];
        }
    }

    export class QuestionnaireAnswerSet {
        setListDefault(): Schema.QuestionnaireAnswerSet[] {
            return [];
        }
    }

    export class QuestionnaireAnswer {
        setListDefault(): Schema.QuestionnaireAnswer[] {
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
        set: new Instance.QuestionnaireSet(),
        section: new Instance.QuestionnaireSection(),
        question: new Instance.QuestionnaireQuestion(),
        answerSet: new Instance.QuestionnaireAnswerSet(),
        answer: new Instance.QuestionnaireAnswer()
    }
}
