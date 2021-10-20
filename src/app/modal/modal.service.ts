/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๙/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ModalErrorComponent } from './modal.component';

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

    private getModal(checkHasOpenModal: boolean, component: any, styleClass: string, content?: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let dialogRef: DynamicDialogRef | undefined;

        if (!checkHasOpenModal || this.openDialogRef.length === 0) {
            setTimeout(() => {
                dialogRef = this.dialogService.open(component, {
                    data: {
                        content: content,
                        description: description,
                        btnMsg: btnMsg
                    },
                    closeOnEscape: false,
                    styleClass: styleClass,
                    transitionOptions: '0ms'
                });

                this.openDialogRef.push(dialogRef);
            }, 1000);
        }

        return dialogRef;
    }


    getModalError(checkHasOpenModal: boolean, content: string, description?: string, btnMsg?: BtnMsg): DynamicDialogRef | undefined {
        let dialogRef: DynamicDialogRef | undefined;

        dialogRef = this.getModal(checkHasOpenModal, ModalErrorComponent, 'modal-error', content, description, btnMsg);

        return dialogRef;
    }

    closeAllModal() {
        this.openDialogRef.forEach((dialogRef: DynamicDialogRef) => dialogRef.destroy());
        this.openDialogRef = [];
    }
}
