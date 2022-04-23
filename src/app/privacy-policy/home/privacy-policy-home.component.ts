/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๑๙/๐๔/๒๕๖๕>
Modify date : <๒๓/๐๔/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';

import { AppService } from '../../app.service';
import { AuthService } from '../../auth.service';
import { Schema } from '../../model.service';
import { MSentService } from '../../m-sent.service';

@Component({
    selector: 'app-privacy-policy-home',
    templateUrl: './privacy-policy-home.component.html',
    styleUrls: ['./privacy-policy-home.component.scss']
})
export class PrivacyPolicyHomeComponent implements OnInit {
    constructor(
        public appService: AppService,
        private authService: AuthService,
        public msentService: MSentService
    ) {
    }

    datasource: Array<{
        termsAndConditions: any,
        privacyNotice: any,
        consent: any
    }> = [];
    dataView = {
        isLoading: false
    };
    userCode: string | null = null;

    async ngOnInit(): Promise<void> {
        this.dataView.isLoading = true;

        let accepted = {
            termsAndConditions: null,
            privacyNotice: null,
            consent: null
        };

        if (this.authService.getUserInfo !== null) {
            let CUID: string = this.appService.doGetCUID([this.authService.getUserInfo.perPersonID, this.authService.getUserInfo.studentCode]);
            let CUIDs: Array<string> = new Array();

            if (CUID.length > 0) {
                CUIDs = (atob(CUID).split('.'));
                this.userCode = (CUIDs.length === 3 ? CUIDs[2] : null);
                this.userCode = (this.userCode !== null && this.userCode.length > 20 ? this.userCode.substring(0, 20) : this.userCode);
            }

            if (this.appService.doIsEmpty(this.userCode) === false)
                accepted.consent = await this.msentService.doGetAccepted(this.msentService.apiConfig.route.consent, this.msentService.acceptedVersion.consentId, this.userCode);
        }

        setTimeout(async () => {
            this.datasource.push(accepted);
            this.dataView.isLoading = false;
        }, 200);
    }
}
