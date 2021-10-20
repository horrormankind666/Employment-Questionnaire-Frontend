/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๐/๑๐/๒๕๖๔>
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
        actionDate: string
    }

    export interface QuestionnaireAnswer {
        ID: string,
        empQuestionnaireAnswerSetID: string,
        defaultAnswerSet: string,
        no: number,
        name: any,
        description: any,
        inputType: string,
        value: string,
        specify: string,
        gotoSection: string,
        actionDate: string
    }

    export interface QuestionnaireDoneAndSet {
        questionnaireDone: QuestionnaireDone | null,
        questionnaireSet: QuestionnaireSet | null,
        questionnaireSection: QuestionnaireSection[],
        questionnaireQuestion: QuestionnaireQuestion[],
        questionnaireAnswerSet: QuestionnaireAnswerSet[],
        questionnaireAnswer: QuestionnaireAnswer[]
    }
}

namespace Instance {
    export class QuestionnaireDoneAndSet {
        constructor(
            private appService: AppService
        ) {
        }

        setListDefault(): Schema.QuestionnaireDoneAndSet[] {
            return [];
        }

        private async getDataSource(action: string, query?: string): Promise<[]> {
            try {
                return await this.appService.getDataSource('Questionnaire/DoneAndSet', action, query, true);
            }
            catch(error) {
                console.log(error);

                return [];
            }
        }

        async getList(): Promise<Schema.QuestionnaireSet[]> {
            try {
                let ds: Schema.QuestionnaireSet[] = await this.getDataSource('getlist');

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
                let ds: Schema.QuestionnaireDoneAndSet[] = await this.getDataSource('get', query);

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
}


@Injectable({
    providedIn: 'root'
})
export class ModelService {
    constructor(
        private appService: AppService
    ) {
    }

    questionnaireDoneAndSet = new Instance.QuestionnaireDoneAndSet(this.appService);
    questionnaireSet = new Instance.QuestionnaireSet();
    questionnaireSection = new Instance.QuestionnaireSection();
    questionnaireQuestion = new Instance.QuestionnaireQuestion();
    questionnaireAnswerSet = new Instance.QuestionnaireAnswerSet();
}
