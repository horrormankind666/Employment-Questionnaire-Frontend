/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๓๐/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalComponent } from './modal.component';

export interface BtnMsg {
    ok?: string,
    cancel?: string,
    close?: string
}

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        private dialogService: DialogService
    ) {
    }

    openDialogRef: DynamicDialogRef[] = [];

    doGetModal(type: string, checkHasOpenModal: boolean, content?: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let dialogRef: DynamicDialogRef | undefined;

        if (!checkHasOpenModal || this.openDialogRef.length === 0) {
            setTimeout(() => {
                dialogRef = this.dialogService.open(ModalComponent, {
                    data: {
                        type: type,
                        content: content,
                        description: description,
                        btnMsg: btnMsg
                    },
                    closeOnEscape: false,
                    styleClass: ('modal-' + type),
                    transitionOptions: '0ms'
                });

                this.openDialogRef.push(dialogRef);
            }, 300);
        }

        return dialogRef;
    }

    doCloseAllModal() {
        this.openDialogRef.forEach((dialogRef: DynamicDialogRef) => dialogRef.destroy());
        this.openDialogRef = [];
    }
}
