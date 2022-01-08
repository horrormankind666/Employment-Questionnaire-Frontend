/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๐๗/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { Schema, ModelService } from '../../model.service';

import * as _ from 'lodash';

export interface TempQuestionnaireDone {
    question: {
        ID: string,
        errorStatus: string
    },
    answer: {
        ID: string,
        value?: any,
        specify?: {
            value: Array<{}> | null
        }
    }
};

class Country {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.Country> = this.modelService.country.doSetListDefault();
}

class Province {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.Province> = this.modelService.province.doSetListDefault();
}

class District {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.District> = this.modelService.district.doSetListDefault();
}

class Subdistrict {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.Subdistrict> = this.modelService.subdistrict.doSetListDefault();
}

class QuestionnaireDoneAndSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireDoneAndSet = this.modelService.questionnaire.doneAndSet.doSetListDefault()[0];
}

class QuestionnaireDone {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireDone | null = this.modelService.questionnaire.done.doSetDefault();
}

class QuestionnaireSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSet | null = this.modelService.questionnaire.set.doSetDefault();
}

class QuestionnaireSection {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.QuestionnaireSection> = this.modelService.questionnaire.section.doSetListDefault();
    dataView = {
        isLoading: false
    };
    panel = {
        toggle: false,
    };
    navigate = {
        that: this,
        doPrevious(): void {
            if (this.that.orderList.activeIndex !== 0)
                this.that.orderList.activeIndex -= 1;

            window.scroll(0,0);
        },
        doNext(): void {
            if ((this.that.orderList.activeIndex + 1) < this.that.datasource.length)
                this.that.orderList.activeIndex += 1;

            window.scroll(0,0);
        }
    };
    orderList = {
        that: this,
        activeIndex: 0,
        doSelection(value: Array<Schema.QuestionnaireSection>): void {
            this.activeIndex = this.that.datasource.indexOf(value[0]);
            window.scroll(0,0);
        }
    }
}

class QuestionnaireQuestion {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.QuestionnaireQuestion> = this.modelService.questionnaire.question.doSetListDefault();
}

class QuestionnaireAnswerSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.QuestionnaireAnswerSet> = this.modelService.questionnaire.answerSet.doSetListDefault();
}

class QuestionnaireAnswer {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Array<Schema.QuestionnaireAnswer> = this.modelService.questionnaire.answer.doSetListDefault();
    formField = new FormField();
    _formField = this.modelService.any.doSetDefault();
    validators = {
        isEmail: {}
    };
}

class FormField {
    singleChoice = null;
    multipleChoice = [];
    shortAnswerText = {};
    longAnswerText = {};
    select = {};
    address = {
        houseNo: {},
        adddressNo: {},
        moo: {},
        building: {},
        village: {},
        floors: {},
        soi: {},
        road: {},
        country: {},
        province: {},
        district: {},
        subdistrict: {},
        zipcode: {},
        telephone: {},
        mobilePhone: {},
        fax: {},
        email: {}
    }
}

@Component({
    selector: 'app-questionnaire-fillout',
    templateUrl: './questionnaire-fillout.component.html',
    styleUrls: ['./questionnaire-fillout.component.scss'],
    providers: [MessageService]
})
export class QuestionnaireFilloutComponent implements OnInit {
    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService,
        public appService: AppService,
        public authService: AuthService,
        private modelService: ModelService
    ) {
    }

    country = this.modelService.any.doSetDefault();
    province = this.modelService.any.doSetDefault();
    district = this.modelService.any.doSetDefault();
    subdistrict = this.modelService.any.doSetDefault();
    questionnaire = {
        menu: {
            panel: {
                toggle: false,
            },
            items: [
                {
                    label: 'questionnaire.explore.label',
                    routerLink: 'Home',
                }
            ]
        },
        doneAndSet: new QuestionnaireDoneAndSet(this.modelService),
        done: new QuestionnaireDone(this.modelService),
        set: new QuestionnaireSet(this.modelService),
        section: new QuestionnaireSection(this.modelService),
        question: this.modelService.any.doSetDefault(),
        answerSet: this.modelService.any.doSetDefault(),
        answer: this.modelService.any.doSetDefault(),
        answerOldValue: this.modelService.any.doSetDefault()
    };
    inputType = {
        singleChoice: 'single choice',
        multipleChoice: 'multiple choice',
        shortAnswerText: 'short answer text',
        longAnswerText: 'long answer text',
        dropdown: 'dropdown',
        personalDetail: 'personal detail',
        institute: 'institute',
        address: 'address'
    };
    addressFields: Array<Schema.InputType> = [
        { name: 'adddressNo', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'moo', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'village', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'building', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'floors', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'soi', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'road', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'country', inputType: this.inputType.dropdown, type: 'select' },
        { name: 'province', inputType: this.inputType.dropdown, type: 'select' },
        { name: 'district', inputType: this.inputType.dropdown, type: 'select' },
        { name: 'subdistrict', inputType: this.inputType.dropdown, type: 'select' },
        { name: 'zipcode', inputType: this.inputType.shortAnswerText, type: 'number', mode: 'decimal', useGrouping: false },
        { name: 'telephone', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '9 9999 9999' },
        { name: 'mobilePhone', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '99 9999 9999' },
        { name: 'fax', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '9 9999 9999' },
        { name: 'email', inputType: this.inputType.shortAnswerText, type: 'email' }
    ];
    modelChange: Array<{
        empQuestionnaireQuestionID: string,
        changeStatus: boolean
    }> = [];
    userInfo: Schema.User = Object.assign({}, this.authService.getUserInfo);

    ngOnInit(): void {
        this.questionnaire.section.dataView.isLoading = true;

        this.country['master'] = new Country(this.modelService);
        this.country['master'].datasource = this.route.snapshot.data.questionnaireDataSource.country;

        this.province['master'] = new Province(this.modelService);
        this.province['master'].datasource = this.route.snapshot.data.questionnaireDataSource.province;

        this.province['th'] = new Province(this.modelService);
        this.province['th'].datasource = this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === '217');

        this.district['master'] = new District(this.modelService);
        this.district['master'].datasource = this.route.snapshot.data.questionnaireDataSource.district;

        this.subdistrict['master'] = new Subdistrict(this.modelService);
        this.subdistrict['master'].datasource = this.route.snapshot.data.questionnaireDataSource.subdistrict;

        this.questionnaire.doneAndSet.datasource = this.route.snapshot.data.questionnaireDataSource.doneAndSet;
        this.questionnaire.done.datasource = this.questionnaire.doneAndSet.datasource.done;
        this.questionnaire.set.datasource = this.questionnaire.doneAndSet.datasource.set;
        this.questionnaire.section.datasource = this.questionnaire.doneAndSet.datasource.section;

        if (this.questionnaire.done.datasource !== null) {
            if (this.authService.userInfo !== null) {
                this.authService.userInfo = this.questionnaire.done.datasource.userInfo;
                this.userInfo = Object.assign({}, this.authService.getUserInfo);
            }
        }

        let qtnquestionObj: any;
        let qtnanswersetObj: any;
        let condition: string | null;

        this.questionnaire.section.datasource.forEach((qtnsection: Schema.QuestionnaireSection) => {
            this.questionnaire.question[qtnsection.ID] = new QuestionnaireQuestion(this.modelService);
            qtnquestionObj = this.questionnaire.question[qtnsection.ID];
            qtnquestionObj.datasource = this.questionnaire.doneAndSet.datasource.question.filter((dr: Schema.QuestionnaireQuestion) => dr.empQuestionnaireSectionID === qtnsection.ID);

            qtnquestionObj.datasource.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                this.modelChange.push({
                    empQuestionnaireQuestionID: qtnquestion.ID,
                    changeStatus: false
                });

                condition = this.doGenerateCoditionString(qtnquestion.condition);
                qtnquestion.disableStatus = (condition !== null ? (this.appService.doEval(condition) ? 'Y' : 'N') : 'N');
                qtnquestion.errorStatus = 'N';

                this.questionnaire.answerSet[qtnquestion.ID] = new QuestionnaireAnswerSet(this.modelService);
                qtnanswersetObj = this.questionnaire.answerSet[qtnquestion.ID];
                qtnanswersetObj.datasource = this.questionnaire.doneAndSet.datasource.answerSet.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === qtnquestion.ID);
            });

            this.model.doSet(qtnsection);
        });

        this.questionnaire.answerOldValue = _.cloneDeep(this.questionnaire.answer);

        setTimeout(() => {
            this.questionnaire.section.dataView.isLoading = false;
        }, (this.questionnaire.set.datasource !== null ? 200 : 0));
    }

    model = {
        that: this,
        doProcess(
            qtnsection: Schema.QuestionnaireSection,
            set: boolean,
            get: boolean
        ): Array<TempQuestionnaireDone> {
            let qtndones: Array<TempQuestionnaireDone> = [];
            let qtndone: TempQuestionnaireDone;
            let qtnanswerObj: any;

            this.that.questionnaire.question[qtnsection.ID].datasource.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                this.that.questionnaire.answerSet[qtnquestion.ID].datasource.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                    if (this.that.questionnaire.answer[qtnanswerset.ID] === undefined)
                        this.that.questionnaire.answer[qtnanswerset.ID] = new QuestionnaireAnswer(this.that.modelService);

                    qtnanswerObj = this.that.questionnaire.answer[qtnanswerset.ID];
                    qtnanswerObj.datasource = this.that.questionnaire.doneAndSet.datasource.answer.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID);

                    if (qtnanswerset.inputType !== null) {
                        let value: any;

                        if ([this.that.inputType.institute, this.that.inputType.personalDetail, this.that.inputType.address].filter((inputType: string) => inputType === qtnanswerset.inputType.inputType).length > 0) {
                            let qtnanswerID: string = this.that.questionnaire.answer[qtnanswerset.ID].datasource[0].ID;

                            if (qtnanswerset.inputType.inputType === this.that.inputType.institute ||
                                qtnanswerset.inputType.inputType === this.that.inputType.personalDetail) {
                                if (get)
                                    value = qtnanswerset.inputType.inputType;

                                if (get)
                                    qtndones.push({
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: (value !== null ? 'N' : 'Y')
                                        },
                                        answer: {
                                            ID: qtnanswerID,
                                            value: value
                                        }
                                    });
                            }

                            if (qtnanswerset.inputType.inputType === this.that.inputType.address) {
                                let address: any = {};

                                if (set) {
                                    if (this.that.country[qtnanswerID] === undefined)
                                        this.that.country[qtnanswerID] = new Country(this.that.modelService);

                                    if (this.that.province[qtnanswerID] === undefined)
                                        this.that.province[qtnanswerID] = new Province(this.that.modelService);

                                    if (this.that.district[qtnanswerID] === undefined)
                                        this.that.district[qtnanswerID] = new District(this.that.modelService);

                                    if (this.that.subdistrict[qtnanswerID] === undefined)
                                        this.that.subdistrict[qtnanswerID] = new Subdistrict(this.that.modelService);
                                }

                                this.that.addressFields.forEach((addressField: Schema.InputType) => {
                                    if (set) {
                                        if (addressField.name === 'country') {
                                            qtnanswerObj.formField.address[addressField.name][qtnanswerID] = this.that.country['master'].datasource.filter((dr: Schema.Country) => dr.ID === '217')[0];
                                            this.that.doSelectOnChange(addressField.name, qtnanswerObj.formField.address[addressField.name][qtnanswerID], qtnanswerset.ID, qtnanswerID);
                                        }
                                        else
                                            qtnanswerObj.formField.address[addressField.name][qtnanswerID] = null;
                                    }

                                    if (get) {
                                        value = qtnanswerObj.formField.address[addressField.name][qtnanswerID];

                                        if (value !== null)
                                            address[addressField.name] = value;
                                    }
                                });

                                if (get) {
                                    let errorStatus: string;

                                    if (Object.keys(address).length > 0)
                                        errorStatus = (qtnanswerObj.validators.isEmail[qtnanswerID] !== undefined ? (qtnanswerObj.validators.isEmail[qtnanswerID] === false ? 'Y' : 'N')  : 'N')
                                    else
                                        errorStatus = 'Y';

                                    qtndones.push({
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: errorStatus
                                        },
                                        answer: {
                                            ID: qtnanswerID,
                                            value: (Object.keys(address).length > 0 ? Object.assign({}, address) : null)
                                        }
                                    });
                                }
                            }
                        }

                        let isRadioButton: boolean = ((qtnanswerset.inputType.inputType === this.that.inputType.singleChoice && qtnanswerset.inputType.type === 'radio') ? true : false);
                        let isCheckbox: boolean = ((qtnanswerset.inputType.inputType === this.that.inputType.multipleChoice && qtnanswerset.inputType.type === 'checkbox') ? true : false);

                        if (isRadioButton === true || isCheckbox === true) {
                            if (isRadioButton === true) {
                                if (set)
                                    qtnanswerObj.formField.singleChoice = null;

                                if (get) {
                                    value = qtnanswerObj.formField.singleChoice;

                                    qtndone = {
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: (value !== null ? 'N' : 'Y')
                                        },
                                        answer: {
                                            ID: qtnanswerset.ID,
                                            value: value
                                        }
                                    };
                                }
                            }

                            if (isCheckbox === true) {
                                if (set)
                                    qtnanswerObj.formField.multipleChoice = [];

                                if (get) {
                                    value = qtnanswerObj.formField.multipleChoice;

                                    qtndone = {
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: (value.length > 0 ? 'N' : 'Y')
                                        },
                                        answer: {
                                            ID: qtnanswerset.ID,
                                            value: (value.length > 0 ? value : null)
                                        }
                                    };
                                }
                            }

                            let _qtnanswerObj: any = qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => (dr.specify !== null));

                            if (_qtnanswerObj.length > 0) {
                                _qtnanswerObj.forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                    let specifys: Array<{
                                        ID: string,
                                        value: any,
                                        specify?: {
                                            ID: string,
                                            value: any,
                                        }
                                    }> = [];

                                    qtnanswer.specify.forEach((qtnanswerspecify: Schema.InputType) => {
                                        if (qtnanswerspecify.inputType === this.that.inputType.shortAnswerText) {
                                            if (set)
                                                qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                                            if (get)
                                                value = qtnanswerObj.formField.shortAnswerText[qtnanswer.ID];
                                        }

                                        if (qtnanswerspecify.inputType === this.that.inputType.longAnswerText) {
                                            if (set)
                                                qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                                            if (get)
                                                value = qtnanswerObj.formField.longAnswerText[qtnanswer.ID];
                                        }

                                        if (qtnanswerspecify.inputType === this.that.inputType.dropdown) {
                                            if (set)
                                                qtnanswerObj.formField.select[qtnanswer.ID] = null;

                                            if (get)
                                                value = qtnanswerObj.formField.select[qtnanswer.ID];
                                        }

                                        if (qtnanswerspecify.items === undefined) {
                                            if (get && value !== null)
                                                specifys.push({
                                                    ID: qtnanswer.ID,
                                                    value: value
                                                });
                                        }

                                        if (qtnanswerspecify.items !== undefined) {
                                            if (qtnanswerObj._formField[qtnanswer.ID] === undefined)
                                                qtnanswerObj._formField[qtnanswer.ID] = new FormField();

                                            if (qtnanswerspecify.inputType === this.that.inputType.singleChoice && qtnanswerspecify.type === 'radio') {
                                                if (set)
                                                    qtnanswerObj._formField[qtnanswer.ID].singleChoice = null;

                                                if (get) {
                                                    value = qtnanswerObj._formField[qtnanswer.ID].singleChoice;

                                                    if (value !== null)
                                                        specifys.push({
                                                            ID: qtnanswer.ID,
                                                            value: value
                                                        });
                                                }
                                            }

                                            if (qtnanswerspecify.inputType === this.that.inputType.multipleChoice && qtnanswerspecify.type === 'checkbox') {
                                                if (set)
                                                    qtnanswerObj._formField[qtnanswer.ID].multipleChoice = [];

                                                if (get) {
                                                    value = qtnanswerObj._formField[qtnanswer.ID].multipleChoice;

                                                    if (value.length > 0)
                                                        specifys.push({
                                                            ID: qtnanswer.ID,
                                                            value: value
                                                        });
                                                }
                                            }

                                            qtnanswerspecify.items.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                                                value = null;

                                                if (qtnanswerspecifyitem.specify[0].inputType === this.that.inputType.longAnswerText) {
                                                    if (set)
                                                        qtnanswerObj._formField[qtnanswer.ID].longAnswerText[qtnanswerspecifyitem.ID] = null;

                                                    if (get)
                                                        value = qtnanswerObj._formField[qtnanswer.ID].longAnswerText[qtnanswerspecifyitem.ID];
                                                }

                                                if (get && value !== null) {
                                                    specifys[specifys.length - 1].specify = {
                                                        ID: qtnanswerspecifyitem.ID,
                                                        value: value
                                                    };
                                                }
                                            });
                                        }
                                    });

                                    if (get) {
                                        let isSpecify: boolean = false;
                                        let qtndoneanswerObj: any;
                                        let errorStatus: string = 'N';

                                        if (qtndone.answer.value !== null) {
                                            if (isRadioButton === true) {
                                                isSpecify = (qtndone.answer.value.specify !== null ? true : false);

                                                if (isSpecify === true) {
                                                    if (specifys.length > 0) {
                                                        specifys.filter((dr: any) => (dr.value.specify !== undefined && dr.value.specify !== null)).forEach((qtnanswerspecify: any) => {
                                                            if (errorStatus === 'N')
                                                                errorStatus = (qtnanswerspecify.specify !== undefined ? 'N' : 'Y');
                                                        });
                                                    }
                                                    else
                                                        errorStatus = 'Y';
                                                }
                                            }

                                            if (isCheckbox === true) {
                                                qtndoneanswerObj = qtndone.answer.value.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null);
                                                isSpecify = (qtndoneanswerObj.length > 0 ? true : false);

                                                if (isSpecify === true) {
                                                    if (qtndoneanswerObj.length === specifys.length) {
                                                        specifys.filter((dr: any) => (dr.value.specify !== undefined && dr.value.specify !== null)).forEach((qtnanswerspecify: any) => {
                                                            if (errorStatus === 'N')
                                                                errorStatus = (qtnanswerspecify.specify !== undefined ? 'N' : 'Y');
                                                        });
                                                    }
                                                    else
                                                        errorStatus = 'Y';
                                                }
                                            }
                                        }

                                        if (isSpecify === true) {
                                            qtndone.question.errorStatus = errorStatus;
                                            qtndone.answer.specify = {
                                                value: (errorStatus === 'N' ? Object.assign([], specifys) : null)
                                            }
                                        }
                                    }
                                });
                            }

                            qtndones.push(qtndone);
                        }
                    }

                    qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => (dr.inputType !== null && dr.inputType.inputType !== undefined && dr.specify === null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                        let value: any;

                        if (qtnanswer.inputType.inputType === this.that.inputType.shortAnswerText) {
                            if (set)
                                qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                            if (get)
                                value = qtnanswerObj.formField.shortAnswerText[qtnanswer.ID];
                        }

                        if (qtnanswer.inputType.inputType === this.that.inputType.longAnswerText) {
                            if (set)
                                qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                            if (get)
                                value = qtnanswerObj.formField.longAnswerText[qtnanswer.ID];
                        }

                        if (qtnanswer.inputType.inputType === this.that.inputType.dropdown) {
                            if (set)
                                qtnanswerObj.formField.select[qtnanswer.ID] = null;

                            if (get)
                                value = qtnanswerObj.formField.select[qtnanswer.ID];
                        }

                        if (get)
                            qtndones.push({
                                question: {
                                    ID: qtnanswerset.empQuestionnaireQuestionID,
                                    errorStatus: (value !== null ? 'N' : 'Y')
                                },
                                answer: {
                                    ID: qtnanswer.ID,
                                    value: value
                                }
                            });
                    });
                });
            });

            return qtndones;
        },
        doSet(qtnsection: Schema.QuestionnaireSection): void {
            this.doProcess(qtnsection, true, false);
        },
        doGet(qtnsection: Schema.QuestionnaireSection): Array<TempQuestionnaireDone> {
            return this.doProcess(qtnsection, false, true);
        }
    }

    doWatchModelChange(
        value: any,
        qtnanswerset: Schema.QuestionnaireAnswerSet
    ): void {
        let changeStatus: boolean = false;

        if (!_.isEqual(this.questionnaire.answerOldValue[qtnanswerset.ID].formField, this.questionnaire.answer[qtnanswerset.ID].formField))
            changeStatus = true;

        this.modelChange[this.modelChange.findIndex((dr: any) => dr.empQuestionnaireQuestionID === qtnanswerset.empQuestionnaireQuestionID)].changeStatus = changeStatus;
        this.questionnaire.doneAndSet.datasource.question.filter((dr: Schema.QuestionnaireQuestion) => dr.ID === qtnanswerset.empQuestionnaireQuestionID).forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
            if (qtnquestion.errorStatus === 'Y')
                qtnquestion.errorStatus = 'N';
        });
    }

    doSelectOnChange(
        formField: string,
        value: any,
        qtnanswersetID: string,
        qtnanswerID: string
    ): void {
        let qtnanswerObj: any = this.questionnaire.answer[qtnanswersetID];

        if (formField === 'country') {
            let country: Schema.Country = value;

            qtnanswerObj.formField.address.province[qtnanswerID] = null;
            this.province[qtnanswerID].datasource = (country !== null ? this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === country.ID) : this.modelService.province.doSetListDefault());

            this.doSelectOnChange('province', null, qtnanswersetID, qtnanswerID);
        }

        if (formField === 'province') {
            let province: Schema.Province = value;

            qtnanswerObj.formField.address.district[qtnanswerID] = null;
            this.district[qtnanswerID].datasource = (province !== null ? this.district['master'].datasource.filter((dr: Schema.District) => dr.province.ID === province.ID) : this.modelService.district.doSetListDefault());

            this.doSelectOnChange('district', null, qtnanswersetID, qtnanswerID);
        }

        if (formField === 'district') {
            let district: Schema.District = value;

            qtnanswerObj.formField.address.subdistrict[qtnanswerID] = null;
            qtnanswerObj.formField.address.zipcode[qtnanswerID] = (district !== null ? district?.zipCode : null);
            this.subdistrict[qtnanswerID].datasource = (district !== null ? this.subdistrict['master'].datasource.filter((dr: Schema.Subdistrict) => dr.district.ID === district.ID) : this.modelService.subdistrict.doSetListDefault());
        }
    }

    doRadiobuttonOnChange(
        qtnanswer: Schema.QuestionnaireAnswer,
        qtnanswerspecifyitem?: {
            selected: Schema.QuestionnaireAnswer,
            items: Array<Schema.QuestionnaireAnswer>
        }
    ): void {
        this.doEventAction(qtnanswer.eventAction);

        let obj: any;

        if (qtnanswerspecifyitem === undefined)
            obj = Object.assign([], this.questionnaire.answer[qtnanswer.empQuestionnaireAnswerSetID].datasource);
        else
            obj = Object.assign([], qtnanswerspecifyitem.items);

        obj.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((_qtnanswer: Schema.QuestionnaireAnswer) => {
            if (qtnanswerspecifyitem === undefined)
                this.doClearAnswerSpecify(_qtnanswer);
            else
                this.doClearAnswerSpecify(qtnanswer, _qtnanswer);
        });
    }

    doCheckboxOnChange(
        qtnanswer: {
            selected: Schema.QuestionnaireAnswer,
            value?: Array<Schema.QuestionnaireAnswer>
        },
        qtnanswerspecifyitem?: {
            selected: Schema.QuestionnaireAnswer,
            value: Array<Schema.QuestionnaireAnswer>
        }
    ): void {
        let obj: any;

        if (qtnanswer.value !== undefined && qtnanswerspecifyitem === undefined)
            obj = Object.assign({}, qtnanswer);

        if (qtnanswer.value === undefined && qtnanswerspecifyitem !== undefined)
            obj = Object.assign({}, qtnanswerspecifyitem);

        if (obj.value.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === obj.selected.ID).length === 0 && obj.selected.specify !== null)
            this.doClearAnswerSpecify(qtnanswer.selected, (qtnanswerspecifyitem === undefined ? undefined : qtnanswerspecifyitem.selected));
    }

    doClearAnswerSpecify(
        qtnanswer: Schema.QuestionnaireAnswer,
        qtnanswerspecifyitem?: Schema.QuestionnaireAnswer
    ): void {
        let qtnanswerSelected: Schema.QuestionnaireAnswer;
        let qtnanswerObj: any = this.questionnaire.answer[qtnanswer.empQuestionnaireAnswerSetID];
        let formField: any;

        if (qtnanswerspecifyitem === undefined) {
            qtnanswerSelected = qtnanswer;
            formField = qtnanswerObj.formField;
        }
        else {
            qtnanswerSelected = qtnanswerspecifyitem;
            formField = qtnanswerObj._formField[qtnanswer.ID]
         }

         qtnanswerSelected.specify.forEach((qtnanswerspecify: Schema.InputType) => {
            if (['text', 'number', 'select'].filter((type: string) => type === qtnanswerspecify.type).length > 0) {
                if (qtnanswerspecify.inputType === this.inputType.shortAnswerText)
                    formField.shortAnswerText[qtnanswerSelected.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.longAnswerText)
                    formField.longAnswerText[qtnanswerSelected.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.dropdown)
                    formField.select[qtnanswerSelected.ID] = null;
            }

            if (qtnanswerspecify.items !== undefined) {
                if (['radio', 'checkbox'].filter((type: string) => type === qtnanswerspecify.type).length > 0) {
                    if (qtnanswerspecify.inputType === this.inputType.singleChoice)
                        qtnanswerObj._formField[qtnanswer.ID].singleChoice = null;

                    if (qtnanswerspecify.inputType === this.inputType.multipleChoice)
                        qtnanswerObj._formField[qtnanswer.ID].multipleChoice = [];
                }

                qtnanswerspecify.items.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((_qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                    if (_qtnanswerspecifyitem.specify[0].inputType === this.inputType.longAnswerText)
                        qtnanswerObj._formField[qtnanswer.ID].longAnswerText[_qtnanswerspecifyitem.ID] = null;
                });
            }
        });
    }

    doGenerateCoditionString(condition: any): string | null {
        if (condition !== null) {
            let or: Array<string> = [];

            condition.forEach((qtnquestionconditions: Array<Schema.Condition>) => {
                let and: Array<string> = [];

                qtnquestionconditions.forEach((qtnquestioncondition: Schema.Condition) => {
                    if (qtnquestioncondition.column === 'gender') {
                        let gender: string = (this.authService.getUserInfo !== null ? this.authService.getUserInfo.gender : '');

                        if (qtnquestioncondition.operator === '=')
                            and.push('("' + gender + '"' + ' !== "' + qtnquestioncondition.value + '")');
                    }
                })

                or.push(and.join(' && '));
            });

            return (or.join(' || '));
        }

        return null
    }

    doEventAction(action: any): void {
        if (action !== null) {
            if (action.sectionOnOff !== undefined) {
                let sectionOnOffObj: any = Object.assign({}, action.sectionOnOff);

                if (sectionOnOffObj.on !== undefined) {
                    let sectionOnObj: any = Object.assign({}, sectionOnOffObj.on);

                    sectionOnObj.section.forEach((sectionObj: any) => {
                        this.questionnaire.section.datasource.filter((dr: Schema.QuestionnaireSection) => dr.ID === sectionObj.ID).forEach((qtnsection: Schema.QuestionnaireSection) => {
                            qtnsection.disableStatus = 'N';

                            this.questionnaire.question[qtnsection.ID].datasource.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                                qtnquestion.disableStatus = 'N';

                                this.questionnaire.answerSet[qtnquestion.ID].datasource.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                                    let qtnanswerObj: any = this.questionnaire.answer[qtnanswerset.ID];

                                    if (qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => dr.eventAction !== null).length > 0)
                                        qtnanswerObj.formField.singleChoice = null;

                                    if (sectionObj.question !== undefined) {
                                        sectionObj.question.filter((dr: any) => dr.ID === qtnquestion.ID).forEach((questionObj: any) => {
                                            if (questionObj.answer !== undefined) {
                                                let answerObj: any = Object.assign({}, questionObj.answer);

                                                if (answerObj.defaultValue !== undefined)
                                                    qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === answerObj.defaultValue).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                                        qtnanswerObj.formField.singleChoice = qtnanswer;
                                                    });
                                            }
                                        });
                                    }
                                })

                                if (sectionObj.question !== undefined) {
                                    sectionObj.question.filter((dr: any) => dr.ID === qtnquestion.ID).forEach((questionObj: any) => {
                                        if (questionObj.disable !== undefined)
                                            qtnquestion.disableStatus = 'Y';
                                    });
                                }
                            });
                        });
                    });
                }

                if (sectionOnOffObj.off !== undefined) {
                    let sectionOffObj: any= Object.assign({}, sectionOnOffObj.off);

                    sectionOffObj.section.forEach((sectionObj: any) => {
                        this.questionnaire.section.datasource.filter((dr: Schema.QuestionnaireSection) => dr.ID === sectionObj.ID).forEach((qtnsection: Schema.QuestionnaireSection) => {
                            qtnsection.disableStatus = 'Y';
                        });
                    });
                }
            }

            if (action.copyAddress !== undefined) {
                let copyAddressObj: any = Object.assign({}, action.copyAddress);
                let qtnanswerFrom: Schema.QuestionnaireAnswer = this.questionnaire.doneAndSet.datasource.answer.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === copyAddressObj.answer.from)[0];
                let qtnanswerTo: Schema.QuestionnaireAnswer = this.questionnaire.doneAndSet.datasource.answer.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === copyAddressObj.answer.to)[0];

                if (qtnanswerFrom !== undefined && qtnanswerTo !== undefined) {
                    let qtnanswerFromObj: any = Object.assign({}, this.questionnaire.answer[qtnanswerFrom.empQuestionnaireAnswerSetID]);
                    let qtnanswerToObj: any = Object.assign({}, this.questionnaire.answer[qtnanswerTo.empQuestionnaireAnswerSetID]);

                    this.addressFields.forEach((addressField: Schema.InputType) => {
                        qtnanswerToObj.formField.address[addressField.name][qtnanswerTo.ID] = null;

                        if (qtnanswerFromObj.formField.address[addressField.name][qtnanswerFrom.ID] !== undefined && qtnanswerToObj.formField.address[addressField.name][qtnanswerTo.ID] !== undefined) {
                            qtnanswerToObj.formField.address[addressField.name][qtnanswerTo.ID] = qtnanswerFromObj.formField.address[addressField.name][qtnanswerFrom.ID];

                            if (['province', 'district'].filter((addressFieldName: string) => addressFieldName === addressField.name).length > 0)
                                this.doSelectOnChange(addressField.name, qtnanswerToObj.formField.address[addressField.name][qtnanswerTo.ID], qtnanswerTo.empQuestionnaireAnswerSetID, qtnanswerTo.ID);
                        }
                    });
                }
            }
        }
    }

    saveandsubmit = {
        that: this,
        isValid: false,
        isSuccess: false,
        isSaving: false,
        isSubmitting: false,
        doSave(): void {
            this.isValid = false;
            this.isSaving = true;

            let qtnsectionObj: Array<Schema.QuestionnaireSection> = this.that.questionnaire.section.datasource.filter((dr: Schema.QuestionnaireSection) => dr.disableStatus === 'N');
            let qtndones: Array<TempQuestionnaireDone> = [];

            qtnsectionObj.forEach((qtnsection: Schema.QuestionnaireSection) => {
                this.that.model.doGet(qtnsection).forEach((qtndone: TempQuestionnaireDone) => {
                    qtndones.push(qtndone);
                });
            });

            let qtndonesObj: Array<TempQuestionnaireDone> = qtndones.filter((dr: TempQuestionnaireDone) => dr.question.errorStatus === 'Y');

            setTimeout(() => {
                /*
                if (qtndonesObj.length > 0) {
                    qtndonesObj.forEach((qtndone: TempQuestionnaireDone) => {
                        this.that.questionnaire.doneAndSet.datasource.question.filter((dr: Schema.QuestionnaireQuestion) => dr.ID === qtndone.question.ID).forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                            qtnquestion.errorStatus = qtndone.question.errorStatus;
                        });
                    });

                    this.that.messageService.add({
                        severity: 'error'
                    });
                }
                else {
                */
                    let userInfo: Schema.User = Object.assign({}, this.that.userInfo);
                    let qtndone: any = {
                        ID: (this.that.questionnaire.done.datasource !== null ? this.that.questionnaire.done.datasource.ID : null),
                        empQuestionnaireSetID: (this.that.questionnaire.set.datasource !== null ? this.that.questionnaire.set.datasource.ID : null),
                        PPID: userInfo.PPID,
                        perPersonID: userInfo.perPersonID,
                        studentCode: userInfo.studentCode,
                        IDCard: userInfo.IDCard,
                        titlePrefixTH: userInfo.titlePrefix.th,
                        titlePrefixEN: userInfo.titlePrefix.en.toUpperCase(),
                        firstNameTH: userInfo.firstName.th,
                        middleNameTH: (userInfo.middleName !== null ? userInfo.middleName.th : null),
                        lastNameTH: userInfo.lastName.th,
                        firstNameEN: userInfo.firstName.en.toUpperCase(),
                        middleNameEN: (userInfo.middleName !== null ? userInfo.middleName.en.toUpperCase() : null),
                        lastNameEN: userInfo.lastName.en.toUpperCase(),
                        instituteNameTH: userInfo.instituteName.th,
                        instituteNameEN: userInfo.instituteName.en.toUpperCase(),
                        facultyID: userInfo.facultyID,
                        facultyCode: userInfo.facultyCode,
                        facultyNameTH: userInfo.facultyName.th,
                        facultyNameEN: userInfo.facultyName.en.toUpperCase(),
                        programID: userInfo.programID,
                        programCode: userInfo.programCode,
                        majorCode: userInfo.majorCode,
                        groupNum: userInfo.groupNum,
                        degreeLevelNameTH: userInfo.degreeLevelName.th,
                        degreeLevelNameEN: userInfo.degreeLevelName.en.toUpperCase(),
                        programNameTH: userInfo.programName.th,
                        programNameEN: userInfo.programName.en.toUpperCase(),
                        degreeNameTH: userInfo.degreeName.th,
                        degreeNameEN: userInfo.degreeName.en.toUpperCase(),
                        branchID: userInfo.branchID,
                        branchNameTH: userInfo.branchName.th,
                        branchNameEN: userInfo.branchName.en.toUpperCase(),
                        class: userInfo.classYear,
                        yearEntry: userInfo.yearEntry,
                        gender: userInfo.gender,
                        birthDate: userInfo.birthDate,
                        nationalityNameTH: userInfo.nationalityName.th,
                        nationalityNameEN: userInfo.nationalityName.en.toUpperCase(),
                        nationality2Letter: userInfo.nationality2Letter,
                        nationality3Letter: userInfo.nationality3Letter,
                        raceNameTH: userInfo.raceName.th,
                        raceNameEN: userInfo.raceName.en.toUpperCase(),
                        race2Letter: userInfo.race2Letter,
                        race3Letter: userInfo.race3Letter,
                        empQuestionnaireAnswer: JSON.stringify(qtndones),
                        submitStatus: 'N',
                        cancelStatus: 'N',
                        actionBy: userInfo.accountName
                    }

                    this.isValid = true;

                    console.log(btoa(encodeURI(JSON.stringify(qtndone))));
                    console.log(decodeURI(atob(btoa(encodeURI(JSON.stringify(qtndone))))));
                //}


                this.isSaving = false;
            }, 100);
        },
        doSubmit(): void {
            //if (this.isValid === true) {
                this.isSuccess = false;
                this.isSubmitting = true;

                setTimeout(() => {
                    this.isSuccess = true;
                    this.isSubmitting = false;
                }, 1000);
            //}
        }
    }
}
