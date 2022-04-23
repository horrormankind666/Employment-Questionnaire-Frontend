/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๐๗/๐๔/๒๕๖๕>
Modify date : <๒๓/๐๔/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModelService, Schema } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class MSentService {
    constructor(
        private appService: AppService,
        private authService: AuthService,
        private modelService: ModelService
    ) {
    }

    headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Lang', this.appService.env.msentConfig.lang)
        .set('Client-ID', this.appService.env.msentConfig.clientID)
        .set('Client-Secret', this.appService.env.msentConfig.clientSecret);

    apiConfig = {
        domain: (this.appService.env.apiURL + '/M-Sent/Get'),
        route: {
            version: "Version",
            termsAndCond: "TermsAndConditions",
            privacyPolicy: "PrivacyPolicy",
            consent: "Consent"
        }
    };
    currentVersion = {
        versionNumber: null,
        versionName: null,
        termsAndCondId: null,
        privacyPolicyId: null,
        consentId: null
    };
    acceptedVersion = {
        versionNumber: null,
        versionName: null,
        termsAndCondId: null,
        privacyPolicyId: null,
        consentId: null
    };

    async doGetIsConsent(): Promise<Schema.Consent> {
        let isError: boolean = false;
        let isConsent: boolean = false;
        let consentChoiceIds: Array<any> | null = null;
        let userCode: string | null = null;

        if (this.authService.getUserInfo !== null) {
            let CUID: string = this.appService.doGetCUID([this.authService.getUserInfo.perPersonID, this.authService.getUserInfo.studentCode]);
            let CUIDs: Array<string> = new Array();

            if (CUID.length > 0) {
                CUIDs = (atob(CUID).split('.'));
                userCode = (CUIDs.length === 3 ? CUIDs[2] : null);
                userCode = (userCode !== null && userCode.length > 20 ? userCode.substring(0, 20) : userCode);
            }

            if (this.appService.doIsEmpty(userCode) === false) {
                let version: any | null = await this.doGetVersion(userCode);

                if (version !== null) {
                    isError = false;

                    this.currentVersion = Object.assign({}, version.currentVersion);
                    this.acceptedVersion = Object.assign({}, version.acceptedVersion);

                    if (this.currentVersion.consentId !== null && this.acceptedVersion.consentId !== null) {
                        isConsent = (this.currentVersion.consentId === this.acceptedVersion.consentId ? true : false);

                        if (isConsent === true) {
                            let accepted: any | null = await this.doGetAccepted(this.apiConfig.route.consent, this.acceptedVersion.consentId, userCode);

                            if (accepted !== null) {
                                if (accepted.consentChoiceIds !== undefined)
                                    consentChoiceIds = accepted.consentChoiceIds
                            }
                        }
                    }
                }
                else
                    isError = true;
            }
            else
                isError = true;
        }
        else
            isError = true;

        return {
            isError: isError,
            isConsent: isConsent,
            consentChoiceIds: consentChoiceIds,
            page: this.doGetPage(this.apiConfig.route.consent, userCode)
        };
    }

    async doGetVersion(
        userCode: string | null
    ): Promise<any | null> {
        if (this.appService.doIsEmpty(userCode) === false) {
            let url = (this.apiConfig.domain + '?route=' + this.apiConfig.route.version + '&userCode=' + userCode);
            let option = {
                headers: this.headers
            };
            let datetime: any = this.appService.doGetCurrentDateTime();

            url += ('&ver=' + datetime.date + datetime.time);

            let result: any = await this.appService.doHttpMethod('GET', url, null, option);

            if (this.appService.doIsEmpty(result) === false) {
                if (result.resultCode === '200' && result.resultDescription === 'Success') {
                    if (this.appService.doIsEmpty(result.data) === false)
                        return result.data;
                }
            }
        }

        return null;
    }

    async doGetAccepted(
        route: string,
        id: string | null,
        userCode: string | null
    ): Promise<any | null> {
        if (this.appService.doIsEmpty(id) === false && this.appService.doIsEmpty(userCode) === false) {
            let url = (this.apiConfig.domain + '?route=' + route + '&id=' + id + '&userCode=' + userCode);
            let option = {
                headers: this.headers
            };
            let datetime: any = this.appService.doGetCurrentDateTime();

            url += ('&ver=' + datetime.date + datetime.time);

            let result: any = await this.appService.doHttpMethod('GET', url, null, option);

            if (this.appService.doIsEmpty(result) === false) {
                if (result.resultCode === '200' && result.resultDescription === 'Success') {
                    if (this.appService.doIsEmpty(result.data) === false)
                        return result.data;
                }
            }
        }

        return null;
    }

    doGetPage(
        route: string,
        userCode: string | null
    ): string | null {
        let page: string | null = null;

        if (route === this.apiConfig.route.consent)
            page = this.appService.env.msentConfig.consentURL;

        if (this.appService.doIsEmpty(page) === false)
            return (
                page +
                ('?lang=' + this.appService.env.msentConfig.lang) +
                ('&clientid=' + this.appService.env.msentConfig.clientID) +
                ('&clientsecret=' + this.appService.env.msentConfig.clientSecret) +
                ('&userid=' + userCode) +
                ('&url=' + this.appService.env.msentConfig.redirectURL)
            );

        return null;
    }

    async doSetConsent(consent: Schema.Consent | null): Promise<any | null> {
        if (consent !== null) {
            if (consent.isError === false) {
                if (consent.isConsent === true) {
                    let jsonData: any = {
                        perPersonID: this.authService.getUserInfo?.perPersonID,
                        consentChoiceIDs: (this.appService.doIsEmpty(consent.consentChoiceIds) === false ? consent.consentChoiceIds : null),
                        actionBy: this.authService.getUserInfo?.accountName
                    };
                    let data: HttpParams = new HttpParams()
                        .set('jsonData', btoa(encodeURI(JSON.stringify(jsonData))));

                    let result: any = await this.modelService.msent.doSet(data);

                    return result;
                }
                else
                    return null;
            }
            else
                return null;
        }
        else
            return null;
    }
}
