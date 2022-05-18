/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๑๗/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, Input, OnInit } from '@angular/core';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    template: `
        <div
            class="p-dialog-content child paragraph">
            {{ content | translate }}
            <div
                class="description"
                *ngIf="description">
                <span>
                    {{ description | translate }}
                </span>
            </div>
        </div>
        <div
            class="p-dialog-footer">
            <button
                pButton
                type="button"
                class="p-button-rounded p-button-{{ type }} p-mr-0"
                label=""
                (click)="doClose()">
                <span>
                    {{ (btnMsg ? btnMsg.close : 'close.label') | translate | titlecase }}
                </span>
            </button>
        </div>
    `,
    styles: []
})
export class ModalComponent implements OnInit {
    @Input() type: any;
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
        this.type = this.dialogConfig.data.type;
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
