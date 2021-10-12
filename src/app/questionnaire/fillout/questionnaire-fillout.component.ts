/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๒/๑๐/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Schema, ModelService } from '../../model.service';

@Component({
    selector: 'app-questionnaire-fillout',
    templateUrl: './questionnaire-fillout.component.html',
    styleUrls: ['./questionnaire-fillout.component.scss']
})
export class QuestionnaireFilloutComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private modelService: ModelService
    ) {
    }

    dsQuestionnaireDoneAndSet: Schema.QuestionnaireDoneAndSet = this.modelService.questionnaireDoneAndSet.setNULL();

    ngOnInit(): void {
        this.dsQuestionnaireDoneAndSet = this.route.snapshot.data.questionnaireDoneAndSet;
    }
}
