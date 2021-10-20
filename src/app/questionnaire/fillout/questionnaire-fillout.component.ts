/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๒๐/๑๐/๒๕๖๔>
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

    datasource: Schema.QuestionnaireDoneAndSet = this.modelService.questionnaireDoneAndSet.setListDefault()[0];
}

class QuestionnaireSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSet | null = this.modelService.questionnaireSet.setDefault();
}

class QuestionnaireSection {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireSection[] = this.modelService.questionnaireSection.setListDefault();
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

    datasource: Schema.QuestionnaireQuestion[] = this.modelService.questionnaireQuestion.setListDefault();
}

class QuestionnaireAnswerSet {
    constructor(
        private modelService: ModelService
    ) {
    }

    datasource: Schema.QuestionnaireAnswerSet[] = this.modelService.questionnaireAnswerSet.setListDefault();
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

    questionnaireDoneAndSet = new QuestionnaireDoneAndSet(this.modelService);
    questionnaireSet = new QuestionnaireSet(this.modelService);
    questionnaireSection = new QuestionnaireSection(this.modelService);
    questionnaireQuestion: Schema.Any = {};
    questionnaireAnswerSet: Schema.Any = {};

    ngOnInit(): void {
        this.questionnaireSection.dataView.isLoading = true;
        this.questionnaireDoneAndSet.datasource = this.route.snapshot.data.questionnaireDoneAndSet;
        this.questionnaireSet.datasource = this.questionnaireDoneAndSet.datasource.questionnaireSet;
        this.questionnaireSection.datasource = this.questionnaireDoneAndSet.datasource.questionnaireSection;

        this.questionnaireSection.datasource.forEach((section: Schema.QuestionnaireSection) => {
            this.questionnaireQuestion[section.ID] = new QuestionnaireQuestion(this.modelService);
            this.questionnaireQuestion[section.ID].datasource = this.questionnaireDoneAndSet.datasource.questionnaireQuestion.filter((dr: Schema.QuestionnaireQuestion) => dr.empQuestionnaireSectionID === section.ID);

            this.questionnaireQuestion[section.ID].datasource.forEach((question: Schema.QuestionnaireQuestion) => {
                this.questionnaireAnswerSet[question.ID] = new QuestionnaireAnswerSet(this.modelService);
                this.questionnaireAnswerSet[question.ID].datasource = this.questionnaireDoneAndSet.datasource.questionnaireAnswerSet.filter((dr: Schema.QuestionnaireAnswerSet) => dr.empQuestionnaireQuestionID === question.ID);
            });
        });

        setTimeout(() => {
            this.questionnaireSection.dataView.isLoading = false;
        }, 1000);
    }
}
