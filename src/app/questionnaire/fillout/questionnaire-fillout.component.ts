/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๒๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { Schema, ModelService } from '../../model.service';

class QuestionnaireDoneAndSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireDoneAndSet = this.modelService.qtnDoneAndSet.setListDefault()[0];
}

class QuestionnaireSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSet | null = this.modelService.qtnSet.setDefault();
}

class QuestionnaireSection {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSection[] = this.modelService.qtnSection.setListDefault();
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

    datasource: Schema.QuestionnaireQuestion[] = this.modelService.qtnQuestion.setListDefault();
}

class QuestionnaireAnswerSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireAnswerSet[] = this.modelService.qtnAnswerSet.setListDefault();
}

class QuestionnaireAnswer {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireAnswer[] = this.modelService.qtnAnswer.setListDefault();
    formField = {
        singleChoice: null,
        multipleChoice: [],
        shortAnswerText: {},
        longAnswerText: {}
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

    qtnDoneAndSet = new QuestionnaireDoneAndSet(this.modelService);
    qtnSet = new QuestionnaireSet(this.modelService);
    qtnSection = new QuestionnaireSection(this.modelService);
    qtnQuestion: Schema.Any = {};
    qtnAnswerSet: Schema.Any = {};
    qtnAnswer: Schema.Any = {};
    inputType = {
        singleChoice: 'single choice',
        multipleChoice: 'multiple choice',
        shortAnswerText: 'short answer text',
        longAnswerText: 'long answer text',
        personalDetail: 'personal detail',
        homeAddress: 'home address',
        workplaceAddress: 'workplace address',
        dropdownProvince: 'dropdown province',
        institute: 'institute'
    };

    ngOnInit(): void {
        this.qtnSection.dataView.isLoading = true;
        this.qtnDoneAndSet.datasource = this.route.snapshot.data.qtnDoneAndSetDataSource;
        this.qtnSet.datasource = this.qtnDoneAndSet.datasource.questionnaireSet;
        this.qtnSection.datasource = this.qtnDoneAndSet.datasource.questionnaireSection;

        this.qtnSection.datasource.forEach((qtnsection: Schema.QuestionnaireSection) => {
            this.qtnQuestion[qtnsection.ID] = new QuestionnaireQuestion(this.modelService);
            this.qtnQuestion[qtnsection.ID].datasource = this.qtnDoneAndSet.datasource.questionnaireQuestion.filter((dr: Schema.QuestionnaireQuestion) => dr.empQuestionnaireSectionID === qtnsection.ID);

            this.qtnQuestion[qtnsection.ID].datasource.forEach((qtnquestion: Schema.QuestionnaireQuestion) => {
                this.qtnAnswerSet[qtnquestion.ID] = new QuestionnaireAnswerSet(this.modelService);
                this.qtnAnswerSet[qtnquestion.ID].datasource = this.qtnDoneAndSet.datasource.questionnaireAnswerSet.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === qtnquestion.ID);

                this.qtnAnswerSet[qtnquestion.ID].datasource.forEach((qtnanswerset: Schema.QuestionnaireAnswerSet) => {
                    this.qtnAnswer[qtnanswerset.ID] = new QuestionnaireAnswer(this.modelService);
                    this.qtnAnswer[qtnanswerset.ID].datasource = this.qtnDoneAndSet.datasource.questionnaireAnswer.filter((dr: Schema.QuestionnaireAnswer) => dr.empQuestionnaireAnswerSetID === qtnanswerset.ID);
                });
            });
        });

        setTimeout(() => {
            this.qtnSection.dataView.isLoading = false;
        }, (this.qtnSet.datasource !== null ? 1000 : 0));
    }
}
