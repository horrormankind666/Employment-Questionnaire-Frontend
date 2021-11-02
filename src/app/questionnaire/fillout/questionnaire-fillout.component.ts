/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๐๒/๑๑/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { Schema, ModelService } from '../../model.service';

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
    formField = {
        singleChoice: null,
        multipleChoice: [],
        shortAnswerText: {},
        longAnswerText: {},
        select: {},
        address: {
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
    };
}

@Component({
    selector: 'app-questionnaire-fillout',
    templateUrl: './questionnaire-fillout.component.html',
    styleUrls: ['./questionnaire-fillout.component.scss'],
})
export class QuestionnaireFilloutComponent implements OnInit {
    constructor(
        public router: Router,
        private route: ActivatedRoute,
        public appService: AppService,
        private modelService: ModelService
    ) {
    }

    country = this.modelService.any.setDefault();
    province = this.modelService.any.setDefault();
    district = this.modelService.any.setDefault();
    subdistrict = this.modelService.any.setDefault();
    questionnaire = {
        doneAndSet: new QuestionnaireDoneAndSet(this.modelService),
        set: new QuestionnaireSet(this.modelService),
        section: new QuestionnaireSection(this.modelService),
        question: this.modelService.any.setDefault(),
        answerSet: this.modelService.any.setDefault(),
        answer: this.modelService.any.setDefault()
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
    addressFields = [
        { inputType: this.inputType.homeAddress, name: 'houseNo' },
        { inputType: this.inputType.workplaceAddress, name: 'adddressNo' },
        { inputType: '*', name: 'moo' },
        { inputType: this.inputType.workplaceAddress, name: 'building' },
        { inputType: this.inputType.homeAddress, name: 'village' },
        { inputType: this.inputType.workplaceAddress, name: 'floors' },
        { inputType: '*', name: 'soi' },
        { inputType: '*', name: 'road' },
        { inputType: this.inputType.workplaceAddress, name: 'country' },
        { inputType: '*', name: 'province' },
        { inputType: '*', name: 'district' },
        { inputType: '*', name: 'subdistrict' },
        { inputType: '*', name: 'zipcode' },
        { inputType: '*', name: 'telephone' },
        { inputType: '*', name: 'mobilePhone' },
        { inputType: '*', name: 'fax' },
        { inputType: '*', name: 'email' }
    ]

    ngOnInit(): void {
        this.questionnaire.section.dataView.isLoading = true;

        this.country['master'] = new Country(this.modelService);
        this.country['master'].datasource = this.route.snapshot.data.questionnaireDataSource.country;

        this.province['master'] = new Province(this.modelService);
        this.province['master'].datasource = this.route.snapshot.data.questionnaireDataSource.province;

        this.district['master'] = new District(this.modelService);
        this.district['master'].datasource = this.route.snapshot.data.questionnaireDataSource.district;

        this.subdistrict['master'] = new Subdistrict(this.modelService);
        this.subdistrict['master'].datasource = this.route.snapshot.data.questionnaireDataSource.subdistrict;

        this.questionnaire.doneAndSet.datasource = this.route.snapshot.data.questionnaireDataSource.doneAndSet;
        this.questionnaire.set.datasource = this.questionnaire.doneAndSet.datasource.set;
        this.questionnaire.section.datasource = this.questionnaire.doneAndSet.datasource.section;

        this.questionnaire.section.datasource.forEach((qtnsection: Schema.QuestionnaireSection) => {
            this.questionnaire.question[qtnsection.ID] = new QuestionnaireQuestion(this.modelService);
            this.questionnaire.question[qtnsection.ID].datasource = this.questionnaire.doneAndSet.datasource.question.filter((dr: Schema.QuestionnaireQuestion) => dr.empQuestionnaireSectionID === qtnsection.ID);

            this.questionnaire.question[qtnsection.ID].datasource.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                this.questionnaire.answerSet[qtnquestion.ID] = new QuestionnaireAnswerSet(this.modelService);
                this.questionnaire.answerSet[qtnquestion.ID].datasource = this.questionnaire.doneAndSet.datasource.answerSet.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === qtnquestion.ID);

                this.questionnaire.answerSet[qtnquestion.ID].datasource.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                    let inputType: any = {
                        inputType: null,
                        type: null
                    };

                    this.questionnaire.answer[qtnanswerset.ID] = new QuestionnaireAnswer(this.modelService);
                    this.questionnaire.answer[qtnanswerset.ID].datasource = this.questionnaire.doneAndSet.datasource.answer.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID);
                    inputType = qtnanswerset.inputType;

                    if (qtnanswerset.inputType !== null && (inputType.inputType === this.inputType.homeAddress || inputType.inputType === this.inputType.workplaceAddress)) {
                        let qtnanswerID = this.questionnaire.answer[qtnanswerset.ID].datasource[0].ID;

                        this.province[qtnanswerID] = new Province(this.modelService);

                        if (inputType.inputType === this.inputType.homeAddress)
                            this.province[qtnanswerID].datasource = this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === '217');
                    }
                });
            });
        });

        this.province['master'].datasource = this.province['master'].datasource.filter((dr: Schema.Province) => dr.country.ID === '217');

        setTimeout(() => {
            this.questionnaire.section.dataView.isLoading = false;
        }, (this.questionnaire.set.datasource !== null ? 1000 : 0));
    }
}
