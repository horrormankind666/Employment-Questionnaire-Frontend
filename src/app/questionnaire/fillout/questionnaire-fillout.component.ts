/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๐๑/๐๗/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from 'primeng/api';

import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { ModalService } from '../../modal/modal.service';
import { Schema, ModelService } from '../../model.service';

import * as _ from 'lodash';

export interface OfferedAnswer {
    question: {
        ID: string,
        errorStatus: string
    },
    answerset: {
        ID: string,
    },
    answer: Schema.OfferedAnswer
}

class Career {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.Career> = this.modelService.career.doSetListDefault();
    filtered: Array<Schema.Career> = this.modelService.career.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.Career>> {
        return await this.modelService.career.doGetList();
    }
}

class Program {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.Program> = this.modelService.program.doSetListDefault();
    filtered: Array<Schema.Program> = this.modelService.program.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.Program>> {
        return await this.modelService.program.doGetList();
    }
}

class Country {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.Country> = this.modelService.country.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.Country>> {
        return await this.modelService.country.doGetList();
    }
}

class Province {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.Province> = this.modelService.province.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.Province>> {
        return await this.modelService.province.doGetList();
    }
}

class District {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.District> = this.modelService.district.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.District>> {
        return await this.modelService.district.doGetList();
    }
}

class Subdistrict {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.Subdistrict> = this.modelService.subdistrict.doSetListDefault();

    async getDataSource(): Promise<Array<Schema.Subdistrict>> {
        return await this.modelService.subdistrict.doGetList();
    }
}

class Questionnaire {
    constructor(private modelService: ModelService) {
    }

    datasource: Schema.Questionnaire = {
        done: this.modelService.questionnaire.done.doSetDefault(),
        answered: this.modelService.questionnaire.answered.doSetListDefault(),
        set: this.modelService.questionnaire.set.doSetDefault(),
        sections: this.modelService.questionnaire.section.doSetListDefault(),
        questions: this.modelService.questionnaire.question.doSetListDefault(),
        answersets: this.modelService.questionnaire.answerset.doSetListDefault(),
        answers: this.modelService.questionnaire.answer.doSetListDefault()
    };
}

class QuestionnaireDone {
    constructor(private modelService: ModelService) {
    }

    datasource: Schema.QuestionnaireDone | null = this.modelService.questionnaire.done.doSetDefault();
}

class QuestionnaireAnswered {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.QuestionnaireAnswered> = this.modelService.questionnaire.answered.doSetListDefault();
}

class QuestionnaireSet {
    constructor(private modelService: ModelService) {
    }

    datasource: Schema.QuestionnaireSet | null = this.modelService.questionnaire.set.doSetDefault();
}

class QuestionnaireSection {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.QuestionnaireSection> = this.modelService.questionnaire.section.doSetListDefault();
    dataView = {
        isFirstload: false,
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
        doSelection(values: Array<Schema.QuestionnaireSection>): void {
            this.activeIndex = this.that.datasource.indexOf(values[0]);
            window.scroll(0,0);
        }
    }
}

class QuestionnaireQuestion {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.QuestionnaireQuestion> = this.modelService.questionnaire.question.doSetListDefault();
}

class QuestionnaireAnswerSet {
    constructor(private modelService: ModelService) {
    }

    datasource: Array<Schema.QuestionnaireAnswerSet> = this.modelService.questionnaire.answerset.doSetListDefault();
}

class QuestionnaireAnswer {
    constructor(private modelService: ModelService) {
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
    multipleChoices = [];
    shortAnswerText = {};
    longAnswerText = {};
    select = {};
    autocomplete = {};
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
        private modalService: ModalService,
        public modelService: ModelService
    ) {
    }

    career = this.modelService.any.doSetDefault();
    program = this.modelService.any.doSetDefault();
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
        result: new Questionnaire(this.modelService),
        done: new QuestionnaireDone(this.modelService),
        answered: new QuestionnaireAnswered(this.modelService),
        set: new QuestionnaireSet(this.modelService),
        section: new QuestionnaireSection(this.modelService),
        question: this.modelService.any.doSetDefault(),
        answerset: this.modelService.any.doSetDefault(),
        answer: this.modelService.any.doSetDefault(),
        offeredanswer: this.modelService.any.doSetDefault()
    };
    inputType = {
        singleChoice: 'single choice',
        multipleChoice: 'multiple choice',
        shortAnswerText: 'short answer text',
        longAnswerText: 'long answer text',
        dropdown: 'dropdown',
        autocomplete: 'autocomplete',
        personalDetail: 'personal detail',
        personalEducational: 'personal educational',
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
        /*
        { name: 'telephone', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '9 9999 9999' },
        { name: 'mobilePhone', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '99 9999 9999' },
        { name: 'fax', inputType: this.inputType.shortAnswerText, type: 'mask', mask: '9 9999 9999' },
        */
        { name: 'telephone', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'mobilePhone', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'fax', inputType: this.inputType.shortAnswerText, type: 'text' },
        { name: 'email', inputType: this.inputType.shortAnswerText, type: 'email' }
    ];
    modelChange: Array<{
        empQuestionnaireQuestionID: string,
        changeStatus: boolean
    }> = [];
    userInfo: Schema.User = Object.assign({}, this.authService.getUserInfo);
    submitStatus: string = 'N';

    async ngOnInit(): Promise<void> {
        this.questionnaire.section.dataView.isLoading = true;

        this.questionnaire.result.datasource = this.route.snapshot.data.questionnaire.result;
        this.questionnaire.done.datasource = this.questionnaire.result.datasource.done;
        this.questionnaire.answered.datasource = this.questionnaire.result.datasource.answered;
        this.questionnaire.set.datasource = this.questionnaire.result.datasource.set;
        this.questionnaire.section.datasource = this.questionnaire.result.datasource.sections;

        if (this.questionnaire.set.datasource !== null &&
            this.questionnaire.result.datasource.answers.length > 0) {
            this.career['master'] = new Career(this.modelService);
            this.career['master'].datasource = await this.career['master'].getDataSource();

            this.program['master'] = new Program(this.modelService);
            this.program['master'].datasource = await this.program['master'].getDataSource();

            this.country['master'] = new Country(this.modelService);
            this.country['master'].datasource = await this.country['master'].getDataSource();

            this.province['master'] = new Province(this.modelService);
            this.province['master'].datasource = await this.province['master'].getDataSource();

            this.province['th'] = new Province(this.modelService);
            this.province['th'].datasource = this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === '217');

            this.district['master'] = new District(this.modelService);
            this.district['master'].datasource = await this.district['master'].getDataSource();

            this.subdistrict['master'] = new Subdistrict(this.modelService);
            this.subdistrict['master'].datasource = await this.subdistrict['master'].getDataSource();
        }

        this.model.doInit();
    }

    model = {
        that: this,
        doInit(): void {
            if (this.that.questionnaire.result.datasource !== undefined) {
                setTimeout(() => {
                    let qtnanswered: Array<Schema.QuestionnaireAnswered> = [];
                    let qtnsections: Array<Schema.QuestionnaireSection> = Object.assign([], this.that.questionnaire.section.datasource);
                    let qtnquestionObj: any;
                    let qtnquestions: Array<Schema.QuestionnaireQuestion> = [];
                    let qtnanswersetObj: any;
                    let condition: string | null;

                    if (this.that.questionnaire.done.datasource !== null) {
                        let qtndone: Schema.QuestionnaireDone = Object.assign({}, this.that.questionnaire.done.datasource);

                        this.that.submitStatus = (qtndone.submitStatus !== undefined ? qtndone.submitStatus : this.that.submitStatus);

                        if (qtndone.userInfo !== undefined) {
                            let userInfo: Schema.User = Object.assign({}, qtndone.userInfo);

                            this.that.userInfo.perPersonID = userInfo.perPersonID;
                            this.that.userInfo.studentCode = userInfo.studentCode;
                            this.that.userInfo.IDCard = userInfo.IDCard;
                            this.that.userInfo.titlePrefix = Object.assign({}, userInfo.titlePrefix);
                            this.that.userInfo.firstName = Object.assign({}, userInfo.firstName);
                            this.that.userInfo.middleName = Object.assign({}, userInfo.middleName);
                            this.that.userInfo.lastName = Object.assign({}, userInfo.lastName);
                            this.that.userInfo.instituteName = Object.assign({}, userInfo.instituteName);
                            this.that.userInfo.facultyID = userInfo.facultyID;
                            this.that.userInfo.facultyCode = userInfo.facultyCode;
                            this.that.userInfo.facultyName = Object.assign({}, userInfo.facultyName);
                            this.that.userInfo.programID = userInfo.programID;
                            this.that.userInfo.programCode = userInfo.programCode;
                            this.that.userInfo.majorCode = userInfo.majorCode;
                            this.that.userInfo.groupNum = userInfo.groupNum;
                            this.that.userInfo.degreeLevelName = Object.assign({}, userInfo.degreeLevelName);
                            this.that.userInfo.programName = Object.assign({}, userInfo.programName);
                            this.that.userInfo.degreeName = Object.assign({}, userInfo.degreeName);
                            this.that.userInfo.branchID = userInfo.branchID;
                            this.that.userInfo.branchName = Object.assign({}, userInfo.branchName);
                            this.that.userInfo.classYear = userInfo.classYear;
                            this.that.userInfo.yearEntry = userInfo.yearEntry;
                            this.that.userInfo.gender = userInfo.gender;
                            this.that.userInfo.birthDate = userInfo.birthDate;
                            this.that.userInfo.nationalityName = Object.assign({}, userInfo.nationalityName);
                            this.that.userInfo.nationality2Letter = userInfo.nationality2Letter;
                            this.that.userInfo.nationality3Letter = userInfo.nationality3Letter;
                            this.that.userInfo.raceName = Object.assign({}, userInfo.raceName);
                            this.that.userInfo.race2Letter = userInfo.race2Letter;
                            this.that.userInfo.race3Letter = userInfo.race3Letter;
                        }

                        if (this.that.questionnaire.answered.datasource !== null)
                            qtnanswered = Object.assign([], this.that.questionnaire.answered.datasource);
                    }

                    qtnsections.forEach((qtnsection: Schema.QuestionnaireSection) => {
                        if (this.that.questionnaire.question[qtnsection.ID] === undefined)
                            this.that.questionnaire.question[qtnsection.ID] = new QuestionnaireQuestion(this.that.modelService);

                        qtnquestionObj = this.that.questionnaire.question[qtnsection.ID];
                        qtnquestionObj.datasource = this.that.questionnaire.result.datasource.questions.filter((dr: Schema.QuestionnaireQuestion) => dr.empQuestionnaireSectionID === qtnsection.ID);
                        qtnquestions = Object.assign([], qtnquestionObj.datasource);

                        qtnquestions.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                            this.that.modelChange.push({
                                empQuestionnaireQuestionID: qtnquestion.ID,
                                changeStatus: false
                            });

                            condition = this.that.doGenerateCoditionString(qtnquestion.condition);
                            qtnquestion.disableStatus = (condition !== null ? (this.that.appService.doEval(condition) ? 'Y' : 'N') : 'N');
                            qtnquestion.errorStatus = (qtnanswered.filter((dr: Schema.QuestionnaireAnswered) => (dr.empQuestionnaireQuestionID === qtnquestion.ID) && (dr.errorStatus === 'Y')).length > 0 ? 'Y' : 'N');

                            this.that.questionnaire.answerset[qtnquestion.ID] = new QuestionnaireAnswerSet(this.that.modelService);
                            qtnanswersetObj = this.that.questionnaire.answerset[qtnquestion.ID];
                            qtnanswersetObj.datasource = this.that.questionnaire.result.datasource.answersets.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === qtnquestion.ID);
                        });

                        this.doSet(qtnsection);
                    });

                    this.doReset();
                    this.that.questionnaire.offeredanswer = _.cloneDeep(this.that.questionnaire.answer);

                    setTimeout(() => {
                        this.that.questionnaire.section.dataView.isFirstload = true;
                        this.that.questionnaire.section.dataView.isLoading = false;

                        if (this.that.questionnaire.set.datasource !== null && this.that.questionnaire.result.datasource.answers.length > 0)  {
                            if (this.that.submitStatus === 'N') {
                                if (this.that.questionnaire.done.datasource !== null) {
                                    if (this.that.questionnaire.result.datasource.questions.filter((dr: Schema.QuestionnaireQuestion) => dr.errorStatus === 'Y').length > 0)
                                        this.that.modalService.doGetModal('danger', false, 'save.error.invalid.label', 'questionnaire.submit.info.label');
                                    else {
                                        this.that.saveandsubmit.isValid = true;
                                        this.that.modalService.doGetModal('success', false, 'questionnaire.submit.info.label');
                                    }
                                }
                                else
                                    this.that.modalService.doGetModal('info', false, 'save.error.invalid.label', 'questionnaire.submit.info.label');
                            }
                        }
                    }, (this.that.questionnaire.set.datasource !== null && this.that.questionnaire.result.datasource.answers.length > 0) ? 100 : 0);
                }, 0);
            }
        },
        doReset(): void {
            let qtnsections: Array<Schema.QuestionnaireSection> = Object.assign([], this.that.questionnaire.section.datasource);
            let qtnanswered: Array<Schema.QuestionnaireAnswered> = [];
            let qtnansweredspecifyvalues: Array<any> = [];

            this.that.messageService.clear();

            if (this.that.questionnaire.done.datasource !== null && this.that.questionnaire.answered.datasource !== null) {
                qtnanswered = Object.assign([], this.that.questionnaire.answered.datasource);
                qtnanswered.filter((dr: Schema.QuestionnaireAnswered) => (dr.answer.specify !== undefined)).forEach((qtnansweredspecify: Schema.QuestionnaireAnswered) => {
                    qtnansweredspecify.answer.specify?.values?.forEach((qtnansweredspecifyvalue: any) => {
                        qtnansweredspecifyvalues.push(qtnansweredspecifyvalue);
                    });
                });

                qtnsections.forEach((qtnsection: Schema.QuestionnaireSection) => {
                    let qtnquestions: Array<Schema.QuestionnaireQuestion> = Object.assign([], this.that.questionnaire.question[qtnsection.ID].datasource);
                    let qtnanswersets: Array<Schema.QuestionnaireAnswerSet> = [];
                    let qtnanswerObj: any;
                    let qtnanswers: Array<Schema.QuestionnaireAnswer> = [];

                    qtnquestions.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                        qtnanswersets = Object.assign([], this.that.questionnaire.answerset[qtnquestion.ID].datasource);

                        qtnanswersets.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                            qtnanswerObj = this.that.questionnaire.answer[qtnanswerset.ID];
                            qtnanswers = Object.assign([], qtnanswerObj.datasource);

                            if (qtnanswerset.inputType !== null) {
                                let value: any;

                                if (qtnanswerset.inputType.inputType === this.that.inputType.address) {
                                    let qtnanswerID: string = qtnanswers[0].ID;

                                    qtnanswered.filter((dr: Schema.QuestionnaireAnswered) => (dr.empQuestionnaireQuestionID === qtnquestion.ID) && (dr.answer.ID === qtnanswerID)).forEach((_qtnanswered: Schema.QuestionnaireAnswered) => {
                                        this.that.addressFields.forEach((addressField: Schema.InputType) => {
                                            value = _qtnanswered.answer.value[addressField.name];
                                            value = (value !== undefined ? value : null);

                                            if (['country', 'province', 'district', 'subdistrict'].filter((dr: string) => dr === addressField.name).length > 0) {
                                                let values: Array<{}> = [];

                                                if (addressField.name === 'country')
                                                    values = this.that.country["master"].datasource.filter((dr: Schema.Country) => dr.ID === (value !== null ? value.ID : '217'));

                                                if (addressField.name === 'province')
                                                    values = this.that.province[qtnanswerID].datasource.filter((dr: Schema.Province) => dr.ID === (value !== null ? value.ID : value));

                                                if (addressField.name === 'district')
                                                    values = this.that.district[qtnanswerID].datasource.filter((dr: Schema.District) => dr.ID === (value !== null ? value.ID : value));

                                                if (addressField.name === 'subdistrict')
                                                    values = this.that.subdistrict[qtnanswerID].datasource.filter((dr: Schema.Subdistrict) => dr.ID === (value !== null ? value.ID : value));

                                                if (values.length > 0) {
                                                    qtnanswerObj.formField.address[addressField.name][qtnanswerID] = values[0];
                                                    this.that.doSelectOnChange(addressField.name, qtnanswerObj.formField.address[addressField.name][qtnanswerID], qtnanswerset.ID, qtnanswerID);
                                                }
                                            }
                                            else {
                                                qtnanswerObj.formField.address[addressField.name][qtnanswerID] = value;

                                                if (addressField.name === 'email')
                                                    qtnanswerObj.validators.isEmail[qtnanswerID] = this.that.appService.doValidatorEmail(qtnanswerObj.formField.address[addressField.name][qtnanswerID]);
                                            }
                                        });
                                    });
                                }

                                let isRadioButton: boolean = ((qtnanswerset.inputType.inputType === this.that.inputType.singleChoice && qtnanswerset.inputType.type === 'radio') ? true : false);
                                let isCheckbox: boolean = ((qtnanswerset.inputType.inputType === this.that.inputType.multipleChoice && qtnanswerset.inputType.type === 'checkbox') ? true : false);

                                if (isRadioButton === true || isCheckbox === true) {
                                    qtnanswered.filter((dr: Schema.QuestionnaireAnswered) => (dr.empQuestionnaireQuestionID === qtnquestion.ID) && (dr.empQuestionnaireAnswerSetID === qtnanswerset.ID)).forEach((_qtnanswered: Schema.QuestionnaireAnswered) => {
                                        value = _qtnanswered.answer.ID;
                                        value = (value !== undefined ? value : null);

                                        let values: Array<Schema.QuestionnaireAnswer> = [];

                                        if (isRadioButton === true) {
                                            values = Object.assign([], qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === value)));

                                            if (values.length > 0) {
                                                qtnanswerObj.formField.singleChoice = values[0];
                                                this.that.doRadiobuttonOnChange(qtnanswerObj.formField.singleChoice);
                                            }
                                        }

                                        if (isCheckbox === true) {
                                            if (value !== null) {
                                                value.forEach((_value: any) => {
                                                    values = Object.assign([], qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === _value)));

                                                    if (values.length > 0)
                                                        qtnanswerObj.formField.multipleChoices.push(values[0]);
                                                });
                                            }
                                        }
                                    });

                                    qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.specify !== null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                        let qtnanswerspecifies: Array<Schema.InputType> = Object.assign([], qtnanswer.specify);

                                        qtnanswerspecifies.forEach((qtnanswerspecify: Schema.InputType) => {
                                            qtnansweredspecifyvalues.filter((dr: any) => dr.ID === qtnanswer.ID).forEach((qtndoneansweredspecifyvalue: any) => {
                                                value = qtndoneansweredspecifyvalue.value;
                                                value = (value !== undefined ? value : null);

                                                if (qtnanswerspecify.inputType === this.that.inputType.shortAnswerText && (qtnanswerspecify.type === 'text' || qtnanswerspecify.type === 'number' || qtnanswerspecify.type === 'email')) {
                                                    qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = value;

                                                    if (qtnanswerspecify.type === 'email')
                                                        qtnanswerObj.validators.isEmail[qtnanswer.ID] = this.that.appService.doValidatorEmail(qtnanswerObj.formField.shortAnswerText[qtnanswer.ID]);
                                                }

                                                if (qtnanswerspecify.inputType === this.that.inputType.longAnswerText && qtnanswerspecify.type === 'text')
                                                    qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = value;

                                                if (qtnanswerspecify.inputType === this.that.inputType.dropdown && qtnanswerspecify.type === 'select') {
                                                    let values: Array<{}> = [];

                                                    if (qtnanswerspecify.mode === 'country')
                                                        values = this.that.country["master"].datasource.filter((dr: Schema.Country) => dr.ID === (value !== null ? value.ID : value));

                                                    if (qtnanswerspecify.mode === 'career')
                                                        values = this.that.career["master"].datasource.filter((dr: Schema.Career) => dr.name === (value !== null ? value.name : value));

                                                    if (values.length > 0)
                                                        qtnanswerObj.formField.select[qtnanswer.ID] = values[0];
                                                    else
                                                        qtnanswerObj.formField.select[qtnanswer.ID] = value;
                                                }

                                                if (qtnanswerspecify.inputType === this.that.inputType.autocomplete && qtnanswerspecify.type === 'text')
                                                    qtnanswerObj.formField.autocomplete[qtnanswer.ID] = value;

                                                if (qtnanswerspecify.items !== undefined) {
                                                    let qtnanswerspecifyitems: Array<Schema.QuestionnaireAnswer> = Object.assign([], qtnanswerspecify.items);
                                                    let values: Array<Schema.QuestionnaireAnswer> = [];

                                                    if (qtnanswerspecify.inputType === this.that.inputType.singleChoice && qtnanswerspecify.type === 'radio') {
                                                        values = qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === value));

                                                        if (values.length > 0) {
                                                            qtnanswerObj._formField[qtnanswer.ID].singleChoice = values[0];
                                                            this.that.doRadiobuttonOnChange(qtnanswer, {
                                                                selected: qtnanswerObj._formField[qtnanswer.ID].singleChoice,
                                                                items: qtnanswerspecify.items
                                                            });
                                                        }
                                                    }

                                                    if (qtnanswerspecify.inputType === this.that.inputType.multipleChoice && qtnanswerspecify.type === 'checkbox') {
                                                        if (value !== null) {
                                                            value.forEach((_value: any) => {
                                                                values = qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === _value));

                                                                if (values.length > 0)
                                                                    qtnanswerObj._formField[qtnanswer.ID].multipleChoices.push(values[0]);
                                                            });
                                                        }
                                                    }

                                                    qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                                                        let qtnanswerspecifyitemspecifies: Array<Schema.InputType> = Object.assign([], qtnanswerspecifyitem.specify);

                                                        qtnanswerspecifyitemspecifies.forEach((qtnanswerspecifyitemspecify: Schema.InputType) => {
                                                            qtnansweredspecifyvalues.filter((dr: any) => (dr.specify !== undefined) && (dr.specify.ID === qtnanswerspecifyitem.ID)).forEach((qtndoneansweredspecifyvalue: any) => {
                                                                value = qtndoneansweredspecifyvalue.specify.value;
                                                                value = (value !== undefined ? value : null);

                                                                if (qtnanswerspecifyitemspecify.inputType === this.that.inputType.longAnswerText && qtnanswerspecifyitemspecify.type === 'text')
                                                                    qtnanswerObj._formField[qtnanswer.ID].longAnswerText[qtnanswerspecifyitem.ID] = value;
                                                            });
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    });
                                }
                            }

                            qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.inputType !== null && dr.inputType.inputType !== undefined && dr.specify === null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                let value: any;

                                qtnanswered.filter((dr: Schema.QuestionnaireAnswered) => (dr.empQuestionnaireQuestionID === qtnquestion.ID) && (dr.answer.ID === qtnanswer.ID)).forEach((_qtnanswered: Schema.QuestionnaireAnswered) => {
                                    value = _qtnanswered.answer.value;
                                    value = (value !== undefined ? value : null);

                                    if (qtnanswer.inputType.inputType === this.that.inputType.shortAnswerText && qtnanswer.inputType.type === 'text')
                                        qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = value;

                                    if (qtnanswer.inputType.inputType === this.that.inputType.longAnswerText && qtnanswer.inputType.type === 'text')
                                        qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = value;

                                    if (qtnanswer.inputType.inputType === this.that.inputType.dropdown && qtnanswer.inputType.type === 'select') {
                                        let values: Array<{}> = [];

                                        if (qtnanswer.inputType.mode === 'country')
                                            values = this.that.country["master"].datasource.filter((dr: Schema.Country) => dr.ID === (value !== null ? value.ID : value));

                                        if (qtnanswer.inputType.mode === 'province')
                                            values = this.that.province["th"].datasource.filter((dr: Schema.Province) => dr.ID === (value !== null ? value.ID : value));

                                        if (qtnanswer.inputType.mode === 'career')
                                            values = this.that.career["master"].datasource.filter((dr: Schema.Career) => dr.name === (value !== null ? value.name : value));

                                        if (values.length > 0)
                                            qtnanswerObj.formField.select[qtnanswer.ID] = values[0];
                                        else
                                            qtnanswerObj.formField.select[qtnanswer.ID] = value;
                                    }

                                    if (qtnanswer.inputType.inputType === this.that.inputType.autocomplete && qtnanswer.inputType.type === 'text')
                                        qtnanswerObj.formField.autocomplete[qtnanswer.ID] = value;
                                });
                            });
                        });
                    });
                });
            }
        },
        doProcess(
            set: boolean,
            get: boolean,
            qtnsection: Schema.QuestionnaireSection
        ): Array<OfferedAnswer> {
            let qtnquestions: Array<Schema.QuestionnaireQuestion> = Object.assign([], this.that.questionnaire.question[qtnsection.ID].datasource);
            let qtnanswersets: Array<Schema.QuestionnaireAnswerSet> = [];
            let qtnanswerObj: any;
            let qtnanswers: Array<Schema.QuestionnaireAnswer> = [];
            let offeredanswers: Array<OfferedAnswer> = [];

            qtnquestions.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                qtnanswersets = Object.assign([], this.that.questionnaire.answerset[qtnquestion.ID].datasource);

                qtnanswersets.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                    if (this.that.questionnaire.answer[qtnanswerset.ID] === undefined)
                        this.that.questionnaire.answer[qtnanswerset.ID] = new QuestionnaireAnswer(this.that.modelService);

                    qtnanswerObj = this.that.questionnaire.answer[qtnanswerset.ID];
                    qtnanswerObj.datasource = this.that.questionnaire.result.datasource.answers.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID);
                    qtnanswers = Object.assign([], qtnanswerObj.datasource);

                    if (qtnanswerset.inputType !== null) {
                        let value: any;

                        if ([this.that.inputType.institute, this.that.inputType.personalDetail, this.that.inputType.address].filter((dr: string) => dr === qtnanswerset.inputType.inputType).length > 0) {
                            let qtnanswerID: string = qtnanswers[0].ID;

                            if (qtnanswerset.inputType.inputType === this.that.inputType.institute ||
                                qtnanswerset.inputType.inputType === this.that.inputType.personalDetail) {
                                if (get) {
                                    let errorStatus: string = 'N';

                                    value = qtnanswerset.inputType.inputType;

                                    if (qtnsection.disableStatus === 'N')
                                        errorStatus = (value !== null ? 'N' : 'Y')
                                    else
                                        value = null;

                                    offeredanswers.push({
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: errorStatus
                                        },
                                        answerset: {
                                            ID: qtnanswerset.ID
                                        },
                                        answer: {
                                            ID: qtnanswerID,
                                            value: value
                                        }
                                    });
                                }
                            }

                            if (qtnanswerset.inputType.inputType === this.that.inputType.address) {
                                let address: any = {};

                                if (set) {
                                    if (this.that.province[qtnanswerID] === undefined)
                                        this.that.province[qtnanswerID] = new Province(this.that.modelService);

                                    if (this.that.district[qtnanswerID] === undefined)
                                        this.that.district[qtnanswerID] = new District(this.that.modelService);

                                    if (this.that.subdistrict[qtnanswerID] === undefined)
                                        this.that.subdistrict[qtnanswerID] = new Subdistrict(this.that.modelService);
                                }

                                this.that.addressFields.forEach((addressField: Schema.InputType) => {
                                    if (set) {
                                        let values: Array<{}> = [];

                                        qtnanswerObj.formField.address[addressField.name][qtnanswerID] = null;

                                        if (addressField.name === 'country') {
                                            values = Object.assign([], this.that.country["master"].datasource.filter((dr: Schema.Country) => dr.ID === '217'));

                                            if (values.length > 0) {
                                                qtnanswerObj.formField.address[addressField.name][qtnanswerID] = values[0];
                                                this.that.doSelectOnChange(addressField.name, qtnanswerObj.formField.address[addressField.name][qtnanswerID], qtnanswerset.ID, qtnanswerID);
                                            }
                                        }
                                    }

                                    if (get) {
                                        value = qtnanswerObj.formField.address[addressField.name][qtnanswerID];

                                        if (value !== null) {
                                            if (['country', 'province', 'district', 'subdistrict'].filter((dr: string) => dr === addressField.name).length > 0)
                                                value = {
                                                    ID: value.ID
                                                };

                                            address[addressField.name] = value;
                                        }
                                    }
                                });

                                if (get) {
                                    let errorStatus: string = 'N';

                                    if (qtnsection.disableStatus === 'N') {
                                        if (Object.keys(address).length > 0)
                                            errorStatus = (qtnanswerObj.validators.isEmail[qtnanswerID] !== undefined ? (qtnanswerObj.validators.isEmail[qtnanswerID] === false ? 'Y' : 'N')  : 'N')
                                        else
                                            errorStatus = 'Y';
                                    }
                                    else
                                        address = {};

                                    offeredanswers.push({
                                        question: {
                                            ID: qtnanswerset.empQuestionnaireQuestionID,
                                            errorStatus: errorStatus
                                        },
                                        answerset: {
                                            ID: qtnanswerset.ID
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
                            let offeredanswerObj: OfferedAnswer | null = null;

                            if (isRadioButton === true) {
                                if (set)
                                    qtnanswerObj.formField.singleChoice = null;

                                if (get)
                                    value = (qtnanswerObj.formField.singleChoice !== null ? qtnanswerObj.formField.singleChoice.ID : null)
                            }

                            if (isCheckbox === true) {
                                if (set)
                                    qtnanswerObj.formField.multipleChoices = [];

                                if (get) {
                                    let values: Array<string> = [];

                                    qtnanswerObj.formField.multipleChoices.forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                        values.push(qtnanswer.ID)
                                    });

                                    value = (values.length > 0 ? Object.assign([], values) : null);
                                }
                            }

                            if (get) {
                                let errorStatus: string = 'N';

                                if (qtnsection.disableStatus === 'N')
                                    errorStatus = (value !== null ? 'N' : 'Y')
                                else
                                    value = null;

                                offeredanswerObj = {
                                    question: {
                                        ID: qtnanswerset.empQuestionnaireQuestionID,
                                        errorStatus: errorStatus
                                    },
                                    answerset: {
                                        ID: qtnanswerset.ID
                                    },
                                    answer: {
                                        ID: value,
                                        value: null
                                    }
                                };
                            }

                            qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.specify !== null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                let specifys: Array<{
                                    ID: string,
                                    value: any,
                                    specify?: {
                                        ID: string,
                                        value: any,
                                    }
                                }> = [];
                                let qtnanswerspecifies: Array<Schema.InputType> = Object.assign([], qtnanswer.specify);

                                qtnanswerspecifies.forEach((qtnanswerspecify: Schema.InputType) => {
                                    if (qtnanswerspecify.inputType === this.that.inputType.shortAnswerText && (qtnanswerspecify.type === 'text' || qtnanswerspecify.type === 'number' || qtnanswerspecify.type === 'email')) {
                                        if (set)
                                            qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                                        if (get) {
                                            value = qtnanswerObj.formField.shortAnswerText[qtnanswer.ID];

                                            if (qtnanswerspecify.type === 'email') {
                                                if (qtnanswerObj.validators.isEmail[qtnanswer.ID] !== undefined && qtnanswerObj.validators.isEmail[qtnanswer.ID] === false)
                                                    value = null;
                                            }
                                        }
                                    }

                                    if (qtnanswerspecify.inputType === this.that.inputType.longAnswerText && qtnanswerspecify.type === 'text') {
                                        if (set)
                                            qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                                        if (get)
                                            value = qtnanswerObj.formField.longAnswerText[qtnanswer.ID];
                                    }

                                    if (qtnanswerspecify.inputType === this.that.inputType.dropdown && qtnanswerspecify.type === 'select') {
                                        if (set)
                                            qtnanswerObj.formField.select[qtnanswer.ID] = null;

                                        if (get) {
                                            value = qtnanswerObj.formField.select[qtnanswer.ID];

                                            if (value !== null) {
                                                if (['career', 'program'].filter((dr: string) => dr === qtnanswerspecify.mode).length === 0)
                                                    value = {
                                                        ID: value.ID
                                                    };
                                            }
                                        }
                                    }

                                    if (qtnanswerspecify.inputType === this.that.inputType.autocomplete && qtnanswerspecify.type === 'text') {
                                        if (set) {
                                            if (qtnanswerspecify.mode === 'career' && this.that.career[qtnanswer.ID] === undefined) {
                                                this.that.career[qtnanswer.ID] = new Career(this.that.modelService);
                                                this.that.career[qtnanswer.ID].datasource = Object.assign([], this.that.career['master'].datasource);
                                            }

                                            if (qtnanswerspecify.mode === 'program' && this.that.program[qtnanswer.ID] === undefined) {
                                                this.that.program[qtnanswer.ID] = new Program(this.that.modelService);
                                                this.that.program[qtnanswer.ID].datasource = Object.assign([], this.that.program['master'].datasource);
                                            }

                                            qtnanswerObj.formField.autocomplete[qtnanswer.ID] = null;
                                        }

                                        if (get)
                                            value = ((qtnanswerObj.formField.autocomplete[qtnanswer.ID] !== null && qtnanswerObj.formField.autocomplete[qtnanswer.ID].length > 0) ? qtnanswerObj.formField.autocomplete[qtnanswer.ID] : null);
                                    }

                                    if (qtnanswerspecify.items === undefined) {
                                        if (get && value !== null)
                                            specifys.push({
                                                ID: qtnanswer.ID,
                                                value: value
                                            });
                                    }

                                    if (qtnanswerspecify.items !== undefined) {
                                        let qtnanswerspecifyitems: Array<Schema.QuestionnaireAnswer> = Object.assign([], qtnanswerspecify.items);

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
                                                        value: value.ID
                                                    });
                                            }
                                        }

                                        if (qtnanswerspecify.inputType === this.that.inputType.multipleChoice && qtnanswerspecify.type === 'checkbox') {
                                            if (set)
                                                qtnanswerObj._formField[qtnanswer.ID].multipleChoices = [];

                                            if (get) {
                                                let values: Array<string> = [];

                                                qtnanswerObj._formField[qtnanswer.ID].multipleChoices.forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                                    values.push(qtnanswer.ID)
                                                });

                                                if (values.length > 0)
                                                    specifys.push({
                                                        ID: qtnanswer.ID,
                                                        value: Object.assign([], values)
                                                    });
                                            }
                                        }

                                        qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                                            let qtnanswerspecifyitemspecifies: Array<Schema.InputType> = Object.assign([], qtnanswerspecifyitem.specify);

                                            qtnanswerspecifyitemspecifies.forEach((qtnanswerspecifyitemspecify: Schema.InputType) => {
                                                value = null;

                                                if (qtnanswerspecifyitemspecify.inputType === this.that.inputType.longAnswerText && qtnanswerspecifyitemspecify.type === 'text') {
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
                                        });
                                    }
                                });

                                if (get) {
                                    if (offeredanswerObj !== null) {
                                        if (specifys.length > 0) {
                                            if (offeredanswerObj.answer.specify !== undefined && offeredanswerObj.answer.specify.values !== null)
                                                offeredanswerObj.answer.specify.values.push(specifys);
                                            else
                                                offeredanswerObj.answer.specify = {
                                                    values: Object.assign([], specifys)
                                                };
                                        }
                                    }
                                }
                            });

                            if (get) {
                                let isSpecify: boolean = false;
                                let qtnansweredvalues: Array<Schema.QuestionnaireAnswer> = [];
                                let errorStatus: string = 'N';

                                if (qtnsection.disableStatus === 'N') {
                                    if (offeredanswerObj !== null && offeredanswerObj.answer.ID !== null) {
                                        if (isRadioButton === true) {
                                            let offeredanswerID: string = offeredanswerObj.answer.ID;

                                            qtnansweredvalues = Object.assign([], qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === offeredanswerID && dr.specify !== null)));
                                            isSpecify = (qtnansweredvalues.length > 0 ? true : false);

                                            if (isSpecify === true)
                                                errorStatus = (offeredanswerObj.answer.specify !== undefined && offeredanswerObj.answer.specify.values !== null ? 'N' : 'Y');
                                        }

                                        if (isCheckbox === true) {
                                            offeredanswerObj.answer.ID.forEach((offeredanswerID: string) => {
                                                qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === offeredanswerID).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                                    if (qtnanswer.specify !== null)
                                                        qtnansweredvalues.push(qtnanswer);
                                                });
                                            });

                                            isSpecify = (qtnansweredvalues.length > 0 ? true : false);

                                            if (isSpecify === true)
                                                errorStatus = (offeredanswerObj.answer.specify !== undefined && offeredanswerObj.answer.specify.values !== null && qtnansweredvalues.length === offeredanswerObj.answer.specify.values.length ? 'N' : 'Y');
                                        }
                                    }

                                    if (isSpecify === true) {
                                        if (errorStatus === 'N') {
                                            if (offeredanswerObj !== null && offeredanswerObj.answer.specify !== undefined && offeredanswerObj.answer.specify.values !== null) {
                                                offeredanswerObj.answer.specify.values.forEach((offeredanswerspecify: any) => {
                                                    let qtnansweredspecifyitemvalues: Array<Schema.QuestionnaireAnswer> = [];

                                                    qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === offeredanswerspecify.ID && dr.specify !== null).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                                        let qtnanswerspecifies: Array<Schema.InputType> = Object.assign([], qtnanswer.specify);
                                                        let qtnanswerspecifyitems: Array<Schema.QuestionnaireAnswer> = [];

                                                        qtnanswerspecifies.filter((dr: Schema.InputType) => dr.items !== undefined).forEach((qtnanswerspecify: Schema.InputType) => {
                                                            qtnanswerspecifyitems = Object.assign([], qtnanswerspecify.items);
                                                        });

                                                        if (Array.isArray(offeredanswerspecify.value)) {
                                                            offeredanswerspecify.value.forEach((offeredanswerspecifyitemID: string) => {
                                                                qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === offeredanswerspecifyitemID).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                                                                    if (qtnanswerspecifyitem.specify !== null)
                                                                        qtnansweredspecifyitemvalues.push(qtnanswerspecifyitem);
                                                                });
                                                            });

                                                            isSpecify = (qtnansweredspecifyitemvalues.length > 0 ? true : false);

                                                            if (isSpecify === true) {
                                                                if (errorStatus === 'N')
                                                                    errorStatus = (offeredanswerspecify.specify !== undefined ? 'N' : 'Y');
                                                            }
                                                        }
                                                        else {
                                                            qtnansweredspecifyitemvalues = Object.assign([], qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => (dr.ID === offeredanswerspecify.value && dr.specify !== null)));
                                                            isSpecify = (qtnansweredspecifyitemvalues.length > 0 ? true : false);

                                                            if (isSpecify === true) {
                                                                if (errorStatus === 'N')
                                                                    errorStatus = (offeredanswerspecify.specify !== undefined ? 'N' : 'Y');
                                                            }
                                                            else
                                                                errorStatus = (offeredanswerspecify.value !== null ? 'N' : 'Y');
                                                        }
                                                    });
                                                });
                                            }
                                        }

                                        if (offeredanswerObj !== null)
                                            offeredanswerObj.question.errorStatus = errorStatus;
                                    }
                                }
                            }

                            if (offeredanswerObj !== null)
                                offeredanswers.push(offeredanswerObj);
                        }
                    }

                    qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => (dr.inputType !== null && dr.inputType.inputType !== undefined && dr.specify === null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                        let value: any;

                        if (qtnanswer.inputType.inputType === this.that.inputType.shortAnswerText && qtnanswer.inputType.type === 'text') {
                            if (set)
                                qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                            if (get)
                                value = qtnanswerObj.formField.shortAnswerText[qtnanswer.ID];
                        }

                        if (qtnanswer.inputType.inputType === this.that.inputType.longAnswerText && qtnanswer.inputType.type === 'text') {
                            if (set)
                                qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                            if (get)
                                value = qtnanswerObj.formField.longAnswerText[qtnanswer.ID];
                        }

                        if (qtnanswer.inputType.inputType === this.that.inputType.dropdown && qtnanswer.inputType.type === 'select') {
                            if (set)
                                qtnanswerObj.formField.select[qtnanswer.ID] = null;

                            if (get) {
                                value = qtnanswerObj.formField.select[qtnanswer.ID];

                                if (value !== null)
                                    value = {
                                        ID: value.ID
                                    }
                            }
                        }

                        if (qtnanswer.inputType.inputType === this.that.inputType.autocomplete && qtnanswer.inputType.type === 'text') {
                            if (set) {
                                if (qtnanswer.inputType.mode === 'career' && this.that.career[qtnanswer.ID] === undefined) {
                                    this.that.career[qtnanswer.ID] = new Career(this.that.modelService);
                                    this.that.career[qtnanswer.ID].datasource = Object.assign([], this.that.career['master'].datasource);
                                }

                                if (qtnanswer.inputType.mode === 'program' && this.that.program[qtnanswer.ID] === undefined) {
                                    this.that.program[qtnanswer.ID] = new Program(this.that.modelService);
                                    this.that.program[qtnanswer.ID].datasource = Object.assign([], this.that.program['master'].datasource);
                                }

                                qtnanswerObj.formField.autocomplete[qtnanswer.ID] = null;
                            }

                            if (get)
                                value = ((qtnanswerObj.formField.autocomplete[qtnanswer.ID] !== null && qtnanswerObj.formField.autocomplete[qtnanswer.ID].length > 0) ? qtnanswerObj.formField.autocomplete[qtnanswer.ID] : null);
                        }

                        if (get) {
                            let errorStatus: string = 'N';

                            if (qtnsection.disableStatus === 'N')
                                errorStatus = (value !== null ? 'N' : 'Y');
                            else
                                value = null;

                            offeredanswers.push({
                                question: {
                                    ID: qtnanswerset.empQuestionnaireQuestionID,
                                    errorStatus: errorStatus
                                },
                                answerset: {
                                    ID: qtnanswerset.ID
                                },
                                answer: {
                                    ID: qtnanswer.ID,
                                    value: value
                                }
                            });
                        }
                    });
                });
            });

            return offeredanswers;
        },
        doSet(
            qtnsection: Schema.QuestionnaireSection
        ): void {
            this.doProcess(true, false, qtnsection);
        },
        doGet(qtnsection: Schema.QuestionnaireSection): Array<OfferedAnswer> {
            return this.doProcess(false, true, qtnsection);
        },
    }

    async doReload(): Promise<void> {
        let result: Schema.Questionnaire = await this.modelService.questionnaire.result.doGet(localStorage.getItem(this.appService.env.localStorageKey.CUID));

        if (result.done !== undefined) {
            this.questionnaire.result.datasource = result;
            this.questionnaire.done.datasource = this.questionnaire.result.datasource.done;
            this.questionnaire.answered.datasource = this.questionnaire.result.datasource.answered;
            this.model.doInit();
        }
    }

    doWatchModelChange(
        value: any,
        qtnanswerset: Schema.QuestionnaireAnswerSet
    ): void {
        let changeStatus: boolean = false;
        let qtnquestions: Array<Schema.QuestionnaireQuestion> = Object.assign([], this.questionnaire.result.datasource.questions);

        if (!_.isEqual(this.questionnaire.offeredanswer[qtnanswerset.ID].formField, this.questionnaire.answer[qtnanswerset.ID].formField))
            changeStatus = true;

        this.modelChange[this.modelChange.findIndex((dr: any) => dr.empQuestionnaireQuestionID === qtnanswerset.empQuestionnaireQuestionID)].changeStatus = changeStatus;
        qtnquestions.filter((dr: Schema.QuestionnaireQuestion) => dr.ID === qtnanswerset.empQuestionnaireQuestionID).forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
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
        let qtnanswers = Object.assign([], qtnanswerObj.datasource);

        if (['country', 'province', 'district'].filter((addressField: string) => addressField === formField).length > 0) {
            if (formField === 'country') {
                let country: Schema.Country = value;
                let provinces: Array<Schema.Province> = Object.assign([], this.province['master'].datasource);

                qtnanswerObj.formField.address.province[qtnanswerID] = null;
                this.province[qtnanswerID].datasource = (country !== null ? provinces.filter((dr: Schema.Province) => dr.country.ID === country.ID) : this.modelService.province.doSetListDefault());

                this.doSelectOnChange('province', null, qtnanswersetID, qtnanswerID);
            }

            if (formField === 'province') {
                let province: Schema.Province = value;
                let districts: Array<Schema.District> = Object.assign([], this.district['master'].datasource);

                qtnanswerObj.formField.address.district[qtnanswerID] = null;
                this.district[qtnanswerID].datasource = (province !== null ? districts.filter((dr: Schema.District) => dr.province.ID === province.ID) : this.modelService.district.doSetListDefault());

                this.doSelectOnChange('district', null, qtnanswersetID, qtnanswerID);
            }

            if (formField === 'district') {
                let district: Schema.District = value;
                let subdistricts: Array<Schema.Subdistrict> = Object.assign([], this.subdistrict['master'].datasource);

                qtnanswerObj.formField.address.subdistrict[qtnanswerID] = null;
                qtnanswerObj.formField.address.zipcode[qtnanswerID] = (district !== null ? district?.zipCode : null);
                this.subdistrict[qtnanswerID].datasource = (district !== null ? subdistricts.filter((dr: Schema.Subdistrict) => dr.district.ID === district.ID) : this.modelService.subdistrict.doSetListDefault());
            }
        }
        else {
            qtnanswers.forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                this.doEventAction(qtnanswer.eventAction);
            });
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

        let objs: Array<any> = [];

        if (qtnanswerspecifyitem === undefined)
            objs = Object.assign([], this.questionnaire.answer[qtnanswer.empQuestionnaireAnswerSetID].datasource);
        else
            objs = Object.assign([], qtnanswerspecifyitem.items);

        objs.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((_qtnanswer: Schema.QuestionnaireAnswer) => {
            if (qtnanswerspecifyitem === undefined)
                this.doClearAnswerSpecify(_qtnanswer);
            else
                this.doClearAnswerSpecify(qtnanswer, _qtnanswer);
        });
    }

    doCheckboxOnChange(
        qtnanswer: {
            selected: Schema.QuestionnaireAnswer,
            values?: Array<Schema.QuestionnaireAnswer>
        },
        qtnanswerspecifyitem?: {
            selected: Schema.QuestionnaireAnswer,
            values: Array<Schema.QuestionnaireAnswer>
        }
    ): void {
        let obj: any;

        if (qtnanswer.values !== undefined && qtnanswerspecifyitem === undefined)
            obj = Object.assign({}, qtnanswer);

        if (qtnanswer.values === undefined && qtnanswerspecifyitem !== undefined)
            obj = Object.assign({}, qtnanswerspecifyitem);

        if (obj.values.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === obj.selected.ID).length === 0 && obj.selected.specify !== null)
            this.doClearAnswerSpecify(qtnanswer.selected, (qtnanswerspecifyitem === undefined ? undefined : qtnanswerspecifyitem.selected));
    }

    doClearAnswerSpecify(
        qtnanswer: Schema.QuestionnaireAnswer,
        qtnanswerspecifyitem?: Schema.QuestionnaireAnswer
    ): void {
        let qtnanswerselectedObj: Schema.QuestionnaireAnswer;
        let qtnanswerObj: any = this.questionnaire.answer[qtnanswer.empQuestionnaireAnswerSetID];
        let formField: any;

        if (qtnanswerspecifyitem === undefined) {
            qtnanswerselectedObj = Object.assign({}, qtnanswer);
            formField = qtnanswerObj.formField;
        }
        else {
            qtnanswerselectedObj = Object.assign({}, qtnanswerspecifyitem);
            formField = qtnanswerObj._formField[qtnanswer.ID]
         }

         let qtnanswerspecifies: Array<Schema.InputType> = Object.assign([], qtnanswerselectedObj.specify);

         qtnanswerspecifies.forEach((qtnanswerspecify: Schema.InputType) => {
            if (['text', 'number', 'email', 'select'].filter((type: string) => type === qtnanswerspecify.type).length > 0) {
                if (qtnanswerspecify.inputType === this.inputType.shortAnswerText) {
                    formField.shortAnswerText[qtnanswerselectedObj.ID] = null;

                    if (qtnanswerspecify.type === 'email')
                        qtnanswerObj.validators.isEmail[qtnanswerselectedObj.ID] = true;
                }

                if (qtnanswerspecify.inputType === this.inputType.longAnswerText)
                    formField.longAnswerText[qtnanswerselectedObj.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.dropdown)
                    formField.select[qtnanswerselectedObj.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.autocomplete)
                    formField.autocomplete[qtnanswerselectedObj.ID] = null;
            }

            if (qtnanswerspecify.items !== undefined) {
                let qtnanswerspecifyitems: Array<Schema.QuestionnaireAnswer> = Object.assign([], qtnanswerspecify.items);

                if (['radio', 'checkbox'].filter((type: string) => type === qtnanswerspecify.type).length > 0) {
                    if (qtnanswerspecify.inputType === this.inputType.singleChoice)
                        qtnanswerObj._formField[qtnanswer.ID].singleChoice = null;

                    if (qtnanswerspecify.inputType === this.inputType.multipleChoice)
                        qtnanswerObj._formField[qtnanswer.ID].multipleChoices = [];
                }

                qtnanswerspecifyitems.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                    if (qtnanswerspecifyitem.specify[0].inputType === this.inputType.longAnswerText && qtnanswerspecifyitem.specify[0].type === 'text') {
                        qtnanswerObj._formField[qtnanswer.ID].longAnswerText[qtnanswerspecifyitem.ID] = null;
                    }
                });
            }
        });
    }

    doGenerateCoditionString(condition: any): string | null {
        if (condition !== null) {
            let or: Array<string> = [];

            condition.forEach((conditions: Array<Schema.Condition>) => {
                let and: Array<string> = [];

                conditions.forEach((qtnquestioncondition: Schema.Condition) => {
                    if (qtnquestioncondition.column === 'gender') {
                        if (qtnquestioncondition.operator === '=')
                            and.push('("' + this.userInfo.gender + '"' + ' !== "' + qtnquestioncondition.value + '")');
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
            let qtnsections: Array<Schema.QuestionnaireSection> = Object.assign([], this.questionnaire.section.datasource);
            let qtnquestions: Array<Schema.QuestionnaireQuestion> = [];
            let qtnanswersets: Array<Schema.QuestionnaireAnswerSet> = [];
            let qtnanswerObj: any;
            let qtnanswers: Array<Schema.QuestionnaireAnswer> = [];

            if (action.sectionOnOff !== undefined) {
                let sectiononoffObj: any = Object.assign({}, action.sectionOnOff);

                if (sectiononoffObj.on !== undefined) {
                    let sectionObj: any = Object.assign({}, sectiononoffObj.on);
                    let sections: Array<any> = Object.assign([], sectionObj.section);
                    let questions: Array<any> = [];

                    sections.forEach((section: any) => {
                        qtnsections.filter((dr: Schema.QuestionnaireSection) => dr.ID === section.ID).forEach((qtnsection: Schema.QuestionnaireSection) => {
                            qtnsection.disableStatus = 'N';
                            qtnquestions = Object.assign([], this.questionnaire.question[qtnsection.ID].datasource);

                            qtnquestions.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                                qtnquestion.disableStatus = 'N';
                                qtnanswersets = Object.assign([], this.questionnaire.answerset[qtnquestion.ID].datasource);

                                qtnanswersets.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                                    qtnanswerObj = this.questionnaire.answer[qtnanswerset.ID];
                                    qtnanswers = Object.assign([], qtnanswerObj.datasource)

                                    if (qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.eventAction !== null).length > 0)
                                        qtnanswerObj.formField.singleChoice = null;

                                    if (section.question !== undefined) {
                                        questions = Object.assign([], section.question);

                                        questions.filter((dr: any) => dr.ID === qtnquestion.ID).forEach((question: any) => {
                                            if (question.answer !== undefined) {
                                                let answerObj: any = Object.assign({}, question.answer);

                                                if (answerObj.defaultValue !== undefined)
                                                    qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === answerObj.defaultValue).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                                                        qtnanswerObj.formField.singleChoice = qtnanswer;
                                                    });
                                            }
                                        });
                                    }
                                })

                                if (section.question !== undefined) {
                                    questions = Object.assign([], section.question);

                                    questions.filter((dr: any) => dr.ID === qtnquestion.ID).forEach((question: any) => {
                                        if (question.disable !== undefined)
                                            qtnquestion.disableStatus = 'Y';
                                    });
                                }
                            });
                        });
                    });
                }

                if (sectiononoffObj.off !== undefined) {
                    let sectionObj: any = Object.assign({}, sectiononoffObj.off);
                    let sections: Array<any> = Object.assign([], sectionObj.section);

                    sections.forEach((section: any) => {
                        qtnsections.filter((dr: Schema.QuestionnaireSection) => dr.ID === section.ID).forEach((qtnsection: Schema.QuestionnaireSection) => {
                            qtnsection.disableStatus = 'Y';
                        });
                    });
                }
            }

            if (action.copyAddress !== undefined) {
                let copyaddressObj: any = Object.assign({}, action.copyAddress);
                let qtnanswers: Array<Schema.QuestionnaireAnswer> = Object.assign([], this.questionnaire.result.datasource.answers);
                let qtnanswerfroms: Array<Schema.QuestionnaireAnswer> = Object.assign([], qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === copyaddressObj.answer.from));
                let qtnanswertos: Array<Schema.QuestionnaireAnswer> = Object.assign([], qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === copyaddressObj.answer.to));

                if (qtnanswerfroms.length > 0 && qtnanswertos.length > 0) {
                    let qtnanswerfromObj: any = Object.assign({}, this.questionnaire.answer[qtnanswerfroms[0].empQuestionnaireAnswerSetID]);
                    let qtnanswertoObj: any = Object.assign({}, this.questionnaire.answer[qtnanswertos[0].empQuestionnaireAnswerSetID]);

                    this.addressFields.forEach((addressField: Schema.InputType) => {
                        qtnanswertoObj.formField.address[addressField.name][qtnanswertos[0].ID] = null;

                        if (qtnanswerfromObj.formField.address[addressField.name][qtnanswerfroms[0].ID] !== undefined && qtnanswertoObj.formField.address[addressField.name][qtnanswertos[0].ID] !== undefined) {
                            qtnanswertoObj.formField.address[addressField.name][qtnanswertos[0].ID] = qtnanswerfromObj.formField.address[addressField.name][qtnanswerfroms[0].ID];

                            if (['province', 'district'].filter((addressFieldName: string) => addressFieldName === addressField.name).length > 0)
                                this.doSelectOnChange(addressField.name, qtnanswertoObj.formField.address[addressField.name][qtnanswertos[0].ID], qtnanswertos[0].empQuestionnaireAnswerSetID, qtnanswertos[0].ID);
                        }
                    });
                }
            }

            if (action.clearAnswerSet !== undefined) {
                let clearanswersetObj: any = Object.assign({}, action.clearAnswerSet);
                let answersets: Array<any> = Object.assign([], clearanswersetObj.answerset);

                answersets.forEach((answerset: any) => {
                    this.questionnaire.result.datasource.answersets.filter((dr: Schema.QuestionnaireAnswerSet) => dr.ID === answerset.ID).forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                        qtnanswerObj = this.questionnaire.answer[qtnanswerset.ID];
                        qtnanswers = Object.assign([], qtnanswerObj.datasource)

                        qtnanswers.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                            if (qtnanswerset.inputType !== null) {
                                if (['radio', 'checkbox'].filter((type: string) => type === qtnanswerset.inputType.type).length > 0) {
                                    if (qtnanswerset.inputType.inputType === this.inputType.singleChoice) {
                                        qtnanswerObj.formField.singleChoice = null;
                                        this.doClearAnswerSpecify(qtnanswer);
                                    }
                                }
                            }

                            if (qtnanswerset.inputType === null) {
                                if (['select'].filter((type: string) => type === qtnanswer.inputType.type).length > 0) {
                                    if (qtnanswer.inputType.inputType === this.inputType.dropdown)
                                        qtnanswerObj.formField.select[qtnanswer.ID] = null;
                                }
                            }
                        });
                    });
                });

            }
        }
    }

    saveandsubmit = {
        that: this,
        isValid: false,
        isSuccess: false,
        isSaving: false,
        isSubmitting: false,
        doGetOfferedAnswer(): Array<OfferedAnswer> {
            let qtnsections: Array<Schema.QuestionnaireSection> = this.that.questionnaire.section.datasource.filter((dr: Schema.QuestionnaireSection) => dr.disableStatus === 'N');
            let offeredanswers: Array<OfferedAnswer> = [];

            qtnsections.forEach((qtnsection: Schema.QuestionnaireSection) => {
                this.that.model.doGet(qtnsection).forEach((offeredanswer: OfferedAnswer) => {
                    offeredanswers.push(offeredanswer);
                });
            });

            return offeredanswers;
        },
        doValidate(offeredanswers: Array<OfferedAnswer>): boolean {
            let qtnquestions: Array<Schema.QuestionnaireQuestion> = Object.assign([], this.that.questionnaire.result.datasource.questions);

            offeredanswers.filter((dr: OfferedAnswer) => dr.question.errorStatus === 'Y').forEach((offeredanswer: OfferedAnswer) => {
                qtnquestions.filter((dr: Schema.QuestionnaireQuestion) => dr.ID === offeredanswer.question.ID).forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                    offeredanswer.question.errorStatus = (qtnquestion.disableStatus === 'Y' ? 'N' : offeredanswer.question.errorStatus)
                    qtnquestion.errorStatus = offeredanswer.question.errorStatus;
                });
            });

            return (qtnquestions.filter((dr: Schema.QuestionnaireQuestion) => dr.errorStatus === 'Y').length > 0 ? false : true);
        },
        doGetValue(
            offeredanswers: Array<OfferedAnswer>,
            submitStatus: string
        ): {} {
            let userInfo: Schema.User = Object.assign({}, this.that.userInfo);
            let offeredanswer2str: string = JSON.stringify(offeredanswers);
            let offeredanswersets: Array<string | null> = [null, null, null, null, null, null, null, null, null, null];
            let start: number = 0;
            let end: number = 0;
            let i: number = 0;

            while(end < offeredanswer2str.length) {
                start = end;
                end = end + 4000;
                end = (end > offeredanswer2str.length ? offeredanswer2str.length : end);

                offeredanswersets[i] = offeredanswer2str.substring(start, end);

                i++;
            }

            let qtndone: any = {
                ID: (this.that.questionnaire.done.datasource !== null ? this.that.questionnaire.done.datasource.ID : null),
                empQuestionnaireSetID: (this.that.questionnaire.done.datasource !== null ? this.that.questionnaire.done.datasource.empQuestionnaireSetID : (this.that.questionnaire.set.datasource !== null ? this.that.questionnaire.set.datasource.ID : null)),
                PPID: userInfo.PPID,
                perPersonID: userInfo.perPersonID,
                studentCode: userInfo.studentCode,
                IDCard: userInfo.IDCard,
                titlePrefixTH: ((userInfo.titlePrefix !== null && userInfo.titlePrefix.th !== null) ? userInfo.titlePrefix.th : null),
                titlePrefixEN: ((userInfo.titlePrefix !== null && userInfo.titlePrefix.en !== null) ? userInfo.titlePrefix.en.toUpperCase() : null),
                firstNameTH: ((userInfo.firstName !== null && userInfo.firstName.th !== null) ? userInfo.firstName.th : null),
                middleNameTH: ((userInfo.middleName !== null && userInfo.middleName.th !== null) ? userInfo.middleName.th : null),
                lastNameTH: ((userInfo.lastName !== null && userInfo.lastName.th !== null) ? userInfo.lastName.th : null),
                firstNameEN: ((userInfo.firstName !== null && userInfo.firstName.en !== null) ? userInfo.firstName.en.toUpperCase() : null),
                middleNameEN: ((userInfo.middleName !== null && userInfo.middleName.en !== null) ? userInfo.middleName.en.toUpperCase() : null),
                lastNameEN: ((userInfo.lastName !== null && userInfo.lastName.en !== null) ? userInfo.lastName.en.toUpperCase() : null),
                instituteNameTH: ((userInfo.instituteName !== null && userInfo.instituteName.th !== null) ? userInfo.instituteName.th : null),
                instituteNameEN: ((userInfo.instituteName !== null && userInfo.instituteName.en !== null) ? userInfo.instituteName.en.toUpperCase() : null),
                facultyID: userInfo.facultyID,
                facultyCode: userInfo.facultyCode,
                facultyNameTH: ((userInfo.facultyName !== null && userInfo.facultyName.th !== null) ? userInfo.facultyName.th : null),
                facultyNameEN: ((userInfo.facultyName !== null && userInfo.facultyName.en !== null) ? userInfo.facultyName.en.toUpperCase() : null),
                programID: userInfo.programID,
                programCode: userInfo.programCode,
                majorCode: userInfo.majorCode,
                groupNum: userInfo.groupNum,
                degreeLevelNameTH: ((userInfo.degreeLevelName !== null && userInfo.degreeLevelName.th !== null) ? userInfo.degreeLevelName.th : null),
                degreeLevelNameEN: ((userInfo.degreeLevelName !== null && userInfo.degreeLevelName.en !== null) ? userInfo.degreeLevelName.en.toUpperCase() : null),
                programNameTH: ((userInfo.programName !== null && userInfo.programName.th !== null) ? userInfo.programName.th : null),
                programNameEN: ((userInfo.programName !== null && userInfo.programName.en !== null) ? userInfo.programName.en.toUpperCase() : null),
                degreeNameTH: ((userInfo.degreeName !== null && userInfo.degreeName.th !== null) ? userInfo.degreeName.th : null),
                degreeNameEN: ((userInfo.degreeName !== null && userInfo.degreeName.en !== null) ? userInfo.degreeName.en.toUpperCase() : null),
                branchID: userInfo.branchID,
                branchNameTH: ((userInfo.branchName !== null && userInfo.branchName.th !== null) ? userInfo.branchName.th : null),
                branchNameEN: ((userInfo.branchName !== null && userInfo.branchName.en !== null) ? userInfo.branchName.en.toUpperCase() : null),
                class: userInfo.classYear,
                yearEntry: userInfo.yearEntry,
                graduateYear: userInfo.graduateYear,
                gender: userInfo.gender,
                birthDate: userInfo.birthDate,
                nationalityNameTH: ((userInfo.nationalityName !== null && userInfo.nationalityName.th !== null) ? userInfo.nationalityName.th : null),
                nationalityNameEN: ((userInfo.nationalityName !== null && userInfo.nationalityName.en !== null) ? userInfo.nationalityName.en.toUpperCase() : null),
                nationality2Letter: userInfo.nationality2Letter,
                nationality3Letter: userInfo.nationality3Letter,
                raceNameTH: ((userInfo.raceName !== null && userInfo.raceName.th !== null) ? userInfo.raceName.th : null),
                raceNameEN: ((userInfo.raceName !== null && userInfo.raceName.en !== null) ? userInfo.raceName.en.toUpperCase() : null),
                race2Letter: userInfo.race2Letter,
                race3Letter: userInfo.race3Letter,
                offeredAnswer01: offeredanswersets[0],
                offeredAnswer02: offeredanswersets[1],
                offeredAnswer03: offeredanswersets[2],
                offeredAnswer04: offeredanswersets[3],
                offeredAnswer05: offeredanswersets[4],
                offeredAnswer06: offeredanswersets[5],
                offeredAnswer07: offeredanswersets[6],
                offeredAnswer08: offeredanswersets[7],
                offeredAnswer09: offeredanswersets[8],
                offeredAnswer10: offeredanswersets[9],
                submitStatus: submitStatus,
                cancelStatus: 'N',
                actionBy: userInfo.accountName,
                actionIP: this.that.appService.ipAddress
            }

            return qtndone;
        },
        async doAction(
            offeredanswers: Array<OfferedAnswer>,
            submitStatus: string
        ): Promise<any>  {
            let userInfo: Schema.User = Object.assign({}, this.that.userInfo);
            let qtndone: any = this.doGetValue(offeredanswers, submitStatus);
            let method: string = (this.that.questionnaire.done.datasource === null ? 'Post' : 'Put')
            let data: HttpParams = new HttpParams()
                .set('jsonData', btoa(encodeURI(JSON.stringify(qtndone))));

            let result: any = await this.that.modelService.questionnaire.done.doSet(method, data);

            if (result.length > 0) {
                let ds1: any = Object.assign([], result[0]);
                let ds2: Array<Schema.QuestionnaireAnswered> = Object.assign([], result[1]);

                if (ds1[0].ID !== undefined && ds1[0].ID !== null) {
                    this.that.questionnaire.result.datasource.done = {
                        ID: ds1[0].ID,
                        empQuestionnaireSetID: ds1[0].empQuestionnaireSetID,
                        userInfo: userInfo,
                        submitStatus: ds1[0].submitStatus,
                        cancelStatus: ds1[0].cancelStatus,
                        actionDate: ds1[0].actionDate,
                        doneDate: ds1[0].doneDate
                    }
                    this.that.submitStatus = ds1[0].submitStatus;
                    this.that.questionnaire.done.datasource = Object.assign({}, this.that.questionnaire.result.datasource.done);
                    localStorage.setItem(
                        this.that.appService.env.localStorageKey.CUID,
                        this.that.appService.doGetCUID([this.that.questionnaire.result.datasource.done.ID, this.that.questionnaire.result.datasource.done.empQuestionnaireSetID, userInfo.perPersonID, userInfo.studentCode])
                    );

                    this.that.questionnaire.result.datasource.answered = Object.assign([], ds2);
                    this.that.questionnaire.answered.datasource = Object.assign([], this.that.questionnaire.result.datasource.answered);
                }
            }

            return result;
        },
        async doSave(): Promise<void> {
            this.isValid = false;
            this.isSaving = true;

            this.that.messageService.clear();

            let offeredanswers: Array<OfferedAnswer> = this.doGetOfferedAnswer();

            if (this.doValidate(offeredanswers) === false)
                this.that.messageService.add({
                    severity: 'error'
                });
            else {
                this.isValid = true;

                this.that.messageService.add({
                    severity: 'success'
                });
            }

            await this.doAction(offeredanswers, 'N');
            this.isSaving = false;
        },
        doSubmit(): void {
            this.that.appService.doSetLoading(true, false);
            this.isValid = false;
            this.isSuccess = false;
            this.isSubmitting = true;

            let offeredanswers: Array<OfferedAnswer> = this.doGetOfferedAnswer();

            if (this.doValidate(offeredanswers) === false) {
                this.isSubmitting = false;

                this.that.modalService.doGetModal('danger', false, 'save.error.invalid.label', 'questionnaire.submit.info.label');
            }
            else {
                this.doAction(offeredanswers, 'Y').then(() => {
                    if (this.that.submitStatus == 'Y')
                        this.isSuccess = true;

                    this.isSubmitting = false;
                    this.that.appService.doSetLoading(false, false);
                });
            }
        }
    }
}
