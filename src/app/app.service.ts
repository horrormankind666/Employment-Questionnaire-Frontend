/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๙/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

import { ModalService } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private title: Title,
        private http: HttpClient,
        private translateService: TranslateService,
        private modalService: ModalService
    ) {
    }

    env = environment;

    doSetBearerToken() {
        let CUID: string = this.doGetCUID(['6unbq648oglyxf90ds']);
        let token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSIsImtpZCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSJ9.eyJhdWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJpc3MiOiJodHRwczovL2lkcC5tYWhpZG9sLmFjLnRoL2FkZnMiLCJpYXQiOjE2NDI2MTE0MDgsIm5iZiI6MTY0MjYxMTQwOCwiZXhwIjoxNjQyNjE1MDA4LCJhdXRoX3RpbWUiOjE2NDI1OTY3NTEsIm5vbmNlIjoiNjM3NzgyMDgyMDgyNjgyMTI1Lk1EWmpOV00wWldZdE9HSXlaQzAwTVRrNUxXSXlOV1V0TmpRMk1qY3hObUpqTjJFNU1tSTFabVU1TkRJdFltVTBaQzAwWmpka0xUaG1abUV0WXpWak1EZzVNekpqWlRGayIsInN1YiI6ImhRdVBXeTFnZSt0ZWtMRlQ4WmxHNEQzaXNVL2FHQTR2WkhnditLUGN3NVk9Iiwic2lkIjoiUy0xLTUtMjEtMjM2ODEzMDQxMi0zMjQ2OTQ5NDYwLTI1MzEzNzM3NDMtMzY0NTkiLCJ1cG4iOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsInVuaXF1ZV9uYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZW1haWwiOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsIndpbmFjY291bnRuYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZ2l2ZW5fbmFtZSI6Illvb3RhcG9vbSIsImZhbWlseV9uYW1lIjoiVGF2YW5uYSIsInBwaWQiOiI2dW5icTY0OG9nbHl4ZjkwZHMiLCJhcHB0eXBlIjoiQ29uZmlkZW50aWFsIiwiYXBwaWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJhdXRobWV0aG9kIjoidXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmRQcm90ZWN0ZWRUcmFuc3BvcnQiLCJ2ZXIiOiIxLjAiLCJzY3AiOiJhbGxhdGNsYWltcyBvcGVuaWQiLCJjX2hhc2giOiJBanZPZGQwZjQ0VzVEczlpUFhrTkRBIn0.Cu7QzC3tYz28_RdZZRWqt59LTzldGKibyD8d1XXioPbxgvYqd-G7e3MUph-_6kP1o_-WfFaO7sal5VDMggndN_YJJ_FpPRIq7-d8NZIizzuKu1Cl-gB2Uax-D91oozHmLhRZcm47q_ATFltWiTPh5fhASAA-NejHn06addDaGW8usseu5aj4qpx9S39Plly5ihNKmY6HZOBN5qniMgoawqvxdFg8b2oyJa_jK5ECvbobdCfwMUTe-KbjKXPjIjsZIMiCenZYsqGypvmMwtc4HMdSJzJ27qx_zIaZdZZ_Ni0vsxSbogO1kSFHCqF0Bj7q6718eRu0jL_xwzzNdz20gw';
        let bearerToken: string = btoa(btoa(CUID.split('').reverse().join('')) + '.' + btoa(token.split('').reverse().join('')));

        localStorage.setItem(this.env.localStorageKey.bearerToken, bearerToken);
    }

    doSetDefaultLang(lang?: string): void {
        this.env.lang = (!lang ? this.env.lang : lang);

        this.translateService.setDefaultLang(this.env.lang);
        this.translateService.use(this.env.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }

    doSetLoading(isLoading: boolean, set?: boolean): void {
        if (set === undefined || set === true)
            this.env.isLoading = isLoading;

        if (isLoading)
            document.body.classList.add('overflow-hidden');
        else
            document.body.classList.remove('overflow-hidden');
    }

    doSetAuthenInfo(
        isAuthenticated: boolean,
        isRole: boolean,
        message: string
    ): void {
        this.env.authenInfo = {
            isAuthenticated: isAuthenticated,
            isRole: isRole,
            message: (message !== undefined ? message : '')
        };
    }

    doGenerateRandAlphaNumStr(len: number = 10) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let result: string = '';

        for (let i = 0; i < len; i++) {
            const rnum = Math.floor(Math.random() * chars.length);

            result += chars.substring(rnum, rnum + 1);
        }

        return result;
    }

    doParseCUID(str: string): Array<string> | null {
        try {
            let strDecode = atob(str);
            let strDecodes = strDecode.split('.');
            let data = strDecodes[2];
            let dataReverse = data.split('').reverse().join('');
            let dataReverseDecode = atob(dataReverse);
            let dataReverseDecodes = dataReverseDecode.split('.');

            return dataReverseDecodes;
        }
        catch {
            return null;
        }
    }

    doGetCUID(datas: Array<any> = []): string {
        let randAlphaNumStr: string = this.doGenerateRandAlphaNumStr(20);

        return (
            btoa(
                (btoa(randAlphaNumStr).split('').reverse().join('')) + '.' +
                (randAlphaNumStr.split('').reverse().join('')) + '.' +
                (btoa(datas.join('.')).split('').reverse().join(''))
            )
        );
    }

    doGetRandomColor(): string {
        let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

        return ('#' + ('000000' + color).slice(-6)).toUpperCase();
    }

    doGetMessagei18n(msg: string): any | null {
        if (msg === 'Database Connection Fail')
            return {
                content: 'error.databaseConnectionFail.label',
                description: ''
            };

        if (msg === 'Unauthorized')
            return {
                content: 'error.unauthorized.label',
                description: 'signin.please.again.label'
            };

        if (msg === 'Token Invalid')
            return {
                content: 'error.token.invalid.label',
                description: 'signin.please.again.label'
            };

        if (msg === 'Token Expired')
            return {
                content: 'error.token.expired.label',
                description: 'signin.please.again.label'
            };

        if (msg === 'User Not Found')
            return {
                content: 'error.userNotFound.label',
                description: 'signin.please.again.label'
            }

        return null;
    }

    doGetCurrentDateTime(): {} {
        return {
            date: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            time: formatDate(new Date(), 'HH:mm:ss', 'en')
        };
    }

    async doHttpMethod(
        method: string,
        url: string,
        data: HttpParams | null,
        option: {}
    ): Promise<any | null> {
        try {
            if (method === 'GET')
                return await this.http.get(url, option).toPromise();

            if (method === 'POST')
                return await this.http.post(url, data, option).toPromise()

            if (method === 'PUT')
                return await this.http.put(url, data, option).toPromise()
        }
        catch(error: any) {
            console.log(error);

            this.modalService.doGetModal('danger', false, error.message);

            return null;
        }
    }

    async doGetDataSource(
        routePrefix: string,
        action: string,
        query?: string,
        showError?: boolean
    ): Promise<Array<any>> {
        try {
            let bearerToken: string | null = localStorage.getItem(this.env.localStorageKey.bearerToken);

            if (bearerToken !== null) {
                routePrefix = (routePrefix === undefined ? '' : routePrefix);
                action = (action === undefined ? '' : action);
                query = (query === undefined || query.length === 0 ? '' : query);

                let url = (this.env.apiURL + '/' + routePrefix + '/');
                let route = '';
                let headers: HttpHeaders = new HttpHeaders()
                    .set('Authorization', ('Bearer ' + bearerToken));
                let option = {
                    headers: headers
                };

                switch (action) {
                    case 'getlist':
                        route = 'GetList';
                        break;
                    case 'get':
                        route = 'Get';
                        break;
                    default:
                        route = action;
                        break;
                }

                let datetime: any = this.doGetCurrentDateTime();

                url += (route + query + '?ver=' + datetime.date + datetime.time);

                let result = await this.doHttpMethod('GET', url, null, option)

                if (result !== null) {
                    if (result.statusCode === 200 && result.message === 'OK')
                        return result['data'];
                    else {
                        if (result.statusCode === 401 || result.statusCode === 404)
                            this.doSetAuthenInfo(false, false, result.message);

                        if (showError) {
                            let messageError: any | null = this.doGetMessagei18n(result.message);

                            if (messageError !== null)
                                this.modalService.doGetModal('danger', false, messageError.content, messageError.description);
                        }

                        return [];
                    }
                }

                return result;
            }
            else {
                this.doSetAuthenInfo(false, false, 'Unauthorized');

                let messageError: any | null = this.doGetMessagei18n(this.env.authenInfo.message);

                if (messageError !== null)
                    this.modalService.doGetModal('danger', false, messageError.content, messageError.description);

                return []
            }
        }
        catch (error) {
            console.log(error);

            return [];
        }
    }

    async doSetDataSource(
        routePrefix: string,
        method: string,
        data: HttpParams,
        showError?: boolean
    ): Promise<Array<any>> {
        try {
            let bearerToken: string | null = localStorage.getItem(this.env.localStorageKey.bearerToken);

            if (bearerToken !== null) {
                routePrefix = (routePrefix === undefined ? '' : routePrefix);

                let url = (this.env.apiURL + '/' + routePrefix + '/' + method);
                let headers: HttpHeaders = new HttpHeaders()
                    .set('Authorization', ('Bearer ' + bearerToken))
                    .set('Content-Type', 'application/x-www-form-urlencoded');
                let option = {
                    headers: headers
                };
                let datetime: any = this.doGetCurrentDateTime();

                url += ('?ver=' + datetime.date + datetime.time);

                let result = await this.doHttpMethod(method.toUpperCase(), url, data, option)

                if (result !== null) {
                    if (result.statusCode === 200 && result.message === 'OK') {
                        return result['data'];
                    }
                    else {
                        if (result.statusCode === 401 || result.statusCode === 404)
                            this.doSetAuthenInfo(false, false, result.message);

                        if (showError) {
                            let messageError: any | null = this.doGetMessagei18n(result.message);

                            if (messageError !== null)
                                this.modalService.doGetModal('danger', false, messageError.content, messageError.description);
                        }

                        return [];
                    }
                }

                return result;
            }
            else {
                this.doSetAuthenInfo(false, false, 'Unauthorized');

                let messageError: any | null = this.doGetMessagei18n(this.env.authenInfo.message);

                if (messageError !== null)
                    this.modalService.doGetModal('danger', false, messageError.content, messageError.description);

                return []
            }
        }
        catch (error) {
            console.log(error);

            return [];
        }
    }

    doArrayFilter(
        array: Array<{}>,
        filterOptions: {
            field: string,
            value: any
        }
    ): Array<{}> {
        return (array.filter((dr: any) => dr[filterOptions.field] === filterOptions.value));
    }

    doValidatorEmail(email: string): boolean {
        const pattern = new RegExp('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$');

        return (email ? pattern.test(email) : true);
    }

    doEval(condition: string): boolean {
        return eval(condition);
    }
}
