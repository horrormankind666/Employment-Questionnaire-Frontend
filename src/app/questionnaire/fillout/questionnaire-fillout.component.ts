/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๑๔/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnChanges,  OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { Schema, ModelService } from '../../model.service';

import * as _ from 'lodash';

class Country {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.Country[] = this.modelService.country.setListDefault();
}

class Province {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.Province[] = this.modelService.province.setListDefault();
}

class District {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.District[] = this.modelService.district.setListDefault();
}

class Subdistrict {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.Subdistrict[] = this.modelService.subdistrict.setListDefault();
}

class QuestionnaireDoneAndSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireDoneAndSet = this.modelService.questionnaire.doneAndSet.setListDefault()[0];
}

class QuestionnaireSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSet | null = this.modelService.questionnaire.set.setDefault();
}

class QuestionnaireSection {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSection[] = this.modelService.questionnaire.section.setListDefault();
    dataView = {
        isLoading: false
    };
    panel = {
        toggle: false,
    };
    navigate = {
        that: this,
        previous(): void {
            if (this.that.orderList.activeIndex !== 0)
                this.that.orderList.activeIndex -= 1;

            window.scroll(0,0);
        },
        next(): void {
            if ((this.that.orderList.activeIndex + 1) < this.that.datasource.length)
                this.that.orderList.activeIndex += 1;

            window.scroll(0,0);
        }
    };
    orderList = {
        that: this,
        activeIndex: 0,
        selection(value: Schema.QuestionnaireSection[]): void {
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

    datasource: Schema.QuestionnaireQuestion[] = this.modelService.questionnaire.question.setListDefault();
}

class QuestionnaireAnswerSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireAnswerSet[] = this.modelService.questionnaire.answerSet.setListDefault();
}

class QuestionnaireAnswer {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireAnswer[] = this.modelService.questionnaire.answer.setListDefault();
    formField = new FormField();
    _formField = this.modelService.any.setDefault();
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
})
export class QuestionnaireFilloutComponent implements OnChanges, OnInit {
    constructor(
        public router: Router,
        private route: ActivatedRoute,
        public appService: AppService,
        public authService: AuthService,
        private modelService: ModelService
    ) {
    }

    country = this.modelService.any.setDefault();
    province = this.modelService.any.setDefault();
    district = this.modelService.any.setDefault();
    subdistrict = this.modelService.any.setDefault();
    questionnaire = {
        menu: {
            panel: {
                toggle: false,
            },
            items: [
                {
                    label: 'questionnaire.explore.label',
                    routerLink: 'Questionnaire',
                }
            ]
        },
        doneAndSet: new QuestionnaireDoneAndSet(this.modelService),
        set: new QuestionnaireSet(this.modelService),
        section: new QuestionnaireSection(this.modelService),
        question: this.modelService.any.setDefault(),
        answerSet: this.modelService.any.setDefault(),
        answer: this.modelService.any.setDefault(),
        answerOldValue: this.modelService.any.setDefault()
    };
    inputType = {
        singleChoice: 'single choice',
        multipleChoice: 'multiple choice',
        shortAnswerText: 'short answer text',
        longAnswerText: 'long answer text',
        personalDetail: 'personal detail',
        homeAddress: 'home address',
        workplaceAddress: 'workplace address',
        institute: 'institute',
        dropdown: 'dropdown'
    };
    addressFields: Schema.InputType[] = [
        { inputType: this.inputType.homeAddress, name: 'houseNo', type: 'text' },
        { inputType: this.inputType.workplaceAddress, name: 'adddressNo', type: 'text' },
        { inputType: '*', name: 'moo', type: 'text' },
        { inputType: this.inputType.workplaceAddress, name: 'building', type: 'text' },
        { inputType: this.inputType.homeAddress, name: 'village', type: 'text' },
        { inputType: this.inputType.workplaceAddress, name: 'floors', type: 'text' },
        { inputType: '*', name: 'soi', type: 'text' },
        { inputType: '*', name: 'road', type: 'text' },
        { inputType: this.inputType.workplaceAddress, name: 'country', type: this.inputType.dropdown },
        { inputType: '*', name: 'province', type: this.inputType.dropdown },
        { inputType: '*', name: 'district', type: this.inputType.dropdown },
        { inputType: '*', name: 'subdistrict', type: this.inputType.dropdown },
        { inputType: '*', name: 'zipcode', type: 'number', mode: 'decimal', useGrouping: false },
        { inputType: '*', name: 'telephone', type: 'mask', mask: '9 9999 9999' },
        { inputType: '*', name: 'mobilePhone', type: 'mask', mask: '99 9999 9999' },
        { inputType: '*', name: 'fax', type: 'mask', mask: '9 9999 9999' },
        { inputType: '*', name: 'email', type: 'text' }
    ];
    modelChange: Array<{ empQuestionnaireQuestionID: string, changeStatus: boolean }> = []

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }

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
        this.questionnaire.set.datasource = this.questionnaire.doneAndSet.datasource.set;
        this.questionnaire.section.datasource = this.questionnaire.doneAndSet.datasource.section;

        let qtnquestionObj: any;
        let qtnanswersetObj: any;
        let qtnanswerObj: any;
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

                condition = this.genCoditionString(qtnquestion.condition);
                qtnquestion.disableStatus = (condition !== null ? (this.appService.eval(condition) ? 'Y' : 'N') : 'N');

                this.questionnaire.answerSet[qtnquestion.ID] = new QuestionnaireAnswerSet(this.modelService);
                qtnanswersetObj = this.questionnaire.answerSet[qtnquestion.ID];
                qtnanswersetObj.datasource = this.questionnaire.doneAndSet.datasource.answerSet.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === qtnquestion.ID);

                qtnanswersetObj.datasource.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                    this.questionnaire.answer[qtnanswerset.ID] = new QuestionnaireAnswer(this.modelService);
                    qtnanswerObj = this.questionnaire.answer[qtnanswerset.ID];
                    qtnanswerObj.datasource = this.questionnaire.doneAndSet.datasource.answer.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID);

                    if (qtnanswerset.inputType !== null) {
                        if (qtnanswerset.inputType.inputType === this.inputType.homeAddress ||
                            qtnanswerset.inputType.inputType === this.inputType.workplaceAddress) {
                            let qtnanswerID: string = this.questionnaire.answer[qtnanswerset.ID].datasource[0].ID;

                            this.province[qtnanswerID] = new Province(this.modelService);
                            this.district[qtnanswerID] = new District(this.modelService);
                            this.subdistrict[qtnanswerID] = new Subdistrict(this.modelService);

                            if (qtnanswerset.inputType.inputType === this.inputType.homeAddress)
                                this.province[qtnanswerID].datasource = this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === '217');

                            this.addressFields.forEach((addressField: Schema.InputType) => {
                                if (addressField.inputType === '*' || addressField.inputType === qtnanswerset.inputType.inputType)
                                    qtnanswerObj.formField.address[addressField.name][qtnanswerID] = null;
                            });
                        }

                        if (qtnanswerset.inputType.inputType === this.inputType.singleChoice && qtnanswerset.inputType.type === 'radio')
                            qtnanswerObj.formField.singleChoice = null;

                        if (qtnanswerset.inputType.inputType === this.inputType.multipleChoice && qtnanswerset.inputType.type === 'checkbox')
                            qtnanswerObj.formField.multipleChoice = [];
                    }

                    qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => (dr.inputType !== null && dr.inputType.inputType !== undefined && dr.specify === null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                        if (qtnanswer.inputType.inputType === this.inputType.shortAnswerText)
                            qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                        if (qtnanswer.inputType.inputType === this.inputType.longAnswerText)
                            qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                        if (qtnanswer.inputType.inputType === this.inputType.dropdown)
                            qtnanswerObj.formField.select[qtnanswer.ID] = null;
                    });

                    qtnanswerObj.datasource.filter((dr: Schema.QuestionnaireAnswer) => (dr.specify !== null)).forEach((qtnanswer: Schema.QuestionnaireAnswer) => {
                        qtnanswer.specify.forEach((qtnanswerspecify: Schema.InputType) => {
                            if (qtnanswerspecify.inputType === this.inputType.shortAnswerText)
                                qtnanswerObj.formField.shortAnswerText[qtnanswer.ID] = null;

                            if (qtnanswerspecify.inputType === this.inputType.longAnswerText)
                                qtnanswerObj.formField.longAnswerText[qtnanswer.ID] = null;

                            if (qtnanswerspecify.inputType === this.inputType.dropdown)
                                qtnanswerObj.formField.select[qtnanswer.ID] = null;

                            if (qtnanswerspecify.items !== undefined) {
                                qtnanswerObj._formField[qtnanswer.ID] = new FormField();

                                if (qtnanswerspecify.inputType === this.inputType.singleChoice && qtnanswerspecify.type === 'radio')
                                    qtnanswerObj._formField[qtnanswer.ID].singleChoice = null;

                                if (qtnanswerspecify.inputType === this.inputType.multipleChoice && qtnanswerspecify.type === 'checkbox')
                                    qtnanswerObj._formField[qtnanswer.ID].multipleChoice = [];

                                qtnanswerspecify.items.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((qtnanswerspecifyitem: Schema.QuestionnaireAnswer) => {
                                    if (qtnanswerspecifyitem.specify[0].inputType === this.inputType.longAnswerText)
                                        qtnanswerObj._formField[qtnanswer.ID].longAnswerText[qtnanswerspecifyitem.ID] = null;
                                });
                            }
                        });
                    });
                });
            });
        });

        this.questionnaire.answerOldValue = _.cloneDeep(this.questionnaire.answer);

        setTimeout(() => {
            this.questionnaire.section.dataView.isLoading = false;
        }, (this.questionnaire.set.datasource !== null ? 1000 : 0));
    }

    watchChange(value: any, qtnanswerset: Schema.QuestionnaireAnswerSet): void {
        let changeStatus: boolean = false;

        if (!_.isEqual(this.questionnaire.answerOldValue[qtnanswerset.ID].formField, this.questionnaire.answer[qtnanswerset.ID].formField))
            changeStatus = true;

        this.modelChange[this.modelChange.findIndex((dr: any) => dr.empQuestionnaireQuestionID === qtnanswerset.empQuestionnaireQuestionID)].changeStatus = changeStatus;
    }

    selectOnChange(formField: string, value: any, qtnanswersetID: string, qtnanswerID: string): void {
        let qtnanswerObj: any = this.questionnaire.answer[qtnanswersetID];

        if (formField === 'country') {
            let country: Schema.Country = value;

            qtnanswerObj.formField.address.province[qtnanswerID] = null;
            this.province[qtnanswerID].datasource = (country !== null ? this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === country.ID) : this.modelService.province.setListDefault());

            this.selectOnChange('province', null, qtnanswersetID, qtnanswerID);
        }

        if (formField === 'province') {
            let province: Schema.Province = value;

            qtnanswerObj.formField.address.district[qtnanswerID] = null;
            this.district[qtnanswerID].datasource = (province !== null ? this.district['master'].datasource.filter((dr: Schema.District) => dr.province.ID === province.ID) : this.modelService.district.setListDefault());

            this.selectOnChange('district', null, qtnanswersetID, qtnanswerID);
        }

        if (formField === 'district') {
            let district: Schema.District = value;

            qtnanswerObj.formField.address.subdistrict[qtnanswerID] = null;
            qtnanswerObj.formField.address.zipcode[qtnanswerID] = (district !== null ? district?.zipCode : null);
            this.subdistrict[qtnanswerID].datasource = (district !== null ? this.subdistrict['master'].datasource.filter((dr: Schema.Subdistrict) => dr.district.ID === district.ID) : this.modelService.subdistrict.setListDefault());
        }
    }

    radiobuttonOnChange(qtnanswer: Schema.QuestionnaireAnswer, qtnanswerspecifyitem?: { selected: Schema.QuestionnaireAnswer, items: Schema.QuestionnaireAnswer[] }): void {
        let obj: any;

        if (qtnanswerspecifyitem === undefined) {
            if (qtnanswer.sectionOnOff !== null) {
                if (qtnanswer.sectionOnOff.on !== undefined) {
                    qtnanswer.sectionOnOff.on.forEach((qtnsectionID: string) => {
                        this.questionnaire.section.datasource[this.questionnaire.section.datasource.findIndex((dr: Schema.QuestionnaireSection) => dr.ID === qtnsectionID)].disableStatus = 'N';
                    });
                }

                if (qtnanswer.sectionOnOff.off !== undefined) {
                    qtnanswer.sectionOnOff.off.forEach((qtnsectionID: string) => {
                        this.questionnaire.section.datasource[this.questionnaire.section.datasource.findIndex((dr: Schema.QuestionnaireSection) => dr.ID === qtnsectionID)].disableStatus = 'Y';
                    });
                }
            }

            obj = Object.assign([], this.questionnaire.answer[qtnanswer.empQuestionnaireAnswerSetID].datasource);
        }
        else
            obj = Object.assign([], qtnanswerspecifyitem.items);

        obj.filter((dr: Schema.QuestionnaireAnswer) => dr.specify !== null).forEach((_qtnanswer: Schema.QuestionnaireAnswer) => {
            if (qtnanswerspecifyitem === undefined)
                this.clearAnswerSpecify(_qtnanswer);
            else
                this.clearAnswerSpecify(qtnanswer, _qtnanswer);
        });
    }

    checkboxOnChange(
        qtnanswer: { selected: Schema.QuestionnaireAnswer, value?: Schema.QuestionnaireAnswer[] },
        qtnanswerspecifyitem?: { selected: Schema.QuestionnaireAnswer, value: Schema.QuestionnaireAnswer[] }
    ): void {
        let obj: any;

        if (qtnanswer.value !== undefined && qtnanswerspecifyitem === undefined)
            obj = Object.assign({}, qtnanswer);

        if (qtnanswer.value === undefined && qtnanswerspecifyitem !== undefined)
            obj = Object.assign({}, qtnanswerspecifyitem);

        if (obj.value.filter((dr: Schema.QuestionnaireAnswer) => dr.ID === obj.selected.ID).length === 0 && obj.selected.specify !== null)
            this.clearAnswerSpecify(qtnanswer.selected, (qtnanswerspecifyitem === undefined ? undefined : qtnanswerspecifyitem.selected));
    }

    clearAnswerSpecify(qtnanswer: Schema.QuestionnaireAnswer, qtnanswerspecifyitem?: Schema.QuestionnaireAnswer): void {
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
            if (['text', 'number', 'select'].filter((type: string) => type = qtnanswerspecify.type)) {
                if (qtnanswerspecify.inputType === this.inputType.shortAnswerText)
                    formField.shortAnswerText[qtnanswerSelected.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.longAnswerText)
                    formField.longAnswerText[qtnanswerSelected.ID] = null;

                if (qtnanswerspecify.inputType === this.inputType.dropdown)
                    formField.select[qtnanswerSelected.ID] = null;
            }

            if (qtnanswerspecify.items !== undefined) {
                if (['radio', 'checkbox'].filter((type: string) => type = qtnanswerspecify.type)) {
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

    genCoditionString(condition: any): string | null {
        if (condition !== null) {
            let or: Array<string> = [];

            condition.forEach((qtnquestionconditions: Schema.Condition[]) => {
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
}
