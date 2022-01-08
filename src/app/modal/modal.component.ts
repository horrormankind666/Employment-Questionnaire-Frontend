/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๑/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, Input, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal-error',
    template: `
        <div class="p-dialog-content child paragraph">
            {{ content | translate }}
            <div class="description" *ngIf="description">
                <span>{{ description | translate }}</span>
            </div>
        </div>
        <div class="p-dialog-footer">
            <button pButton type="button" label="" class="p-button-rounded p-button-danger p-mr-0" (click)="doClose()">
                <span>{{ (btnMsg ? btnMsg.close : 'close.label') | translate | titlecase }}</span>
            </button>
        </div>
    `,
    styles: []
})
export class ModalErrorComponent implements OnInit {
    @Input() content: any;
    @Input() description: any;
    @Input() btnMsg: any;

    constructor(
        private dialogConfig: DynamicDialogConfig,
        private dialogRef: DynamicDialogRef,
        private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
        this.content = this.dialogConfig.data.content;
        this.description = this.dialogConfig.data.description;
        this.btnMsg = this.dialogConfig.data.btnMsg;
    }

    doClose(): void {
        this.modalService.openDialogRef.pop();

        if (this.modalService.openDialogRef.length > 0)
            document.body.classList.add('overflow-hidden');
        else
            document.body.classList.remove('overflow-hidden');

        this.dialogRef.close();
    }
}
