/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๓๐/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
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
        private jwtHelperService: JwtHelperService,
        private translateService: TranslateService,
        private modalService: ModalService
    ) {
    }

    token: string | null = null;
    OK: string = 'OK';
    DATABASE_CONNECTION_FAIL: string = 'Database Connection Fail';
    UNAUTHORIZED: string = 'Unauthorized';
    TOKEN_INVALID: string = 'Token Invalid';
    TOKEN_EXPIRED: string = 'Token Expired';
    USER_NOT_FOUND: string = 'User Not Found';

    env = environment;

    async doSetBearerToken(): Promise<any> {
        let bearerToken: string | null = localStorage.getItem(this.env.localStorageKey.bearerToken);
        let posError: number = window.location.href.indexOf('error');
        let posCode: number = window.location.href.indexOf('code');

        if (bearerToken === null) {
            if (posError !== -1)
                this.modalService.doGetModal('danger', false, window.location.href);
            else {
                if (posCode !== -1) {
                    let params: HttpParams = new HttpParams()
                        .set('CUID', this.doGetCUID([btoa(this.env.oauthConfig.redirectURL), btoa(window.location.href.substring(posCode + 5))]));
                    let headers: HttpHeaders = new HttpHeaders()
                        .set('Content-Type', 'application/x-www-form-urlencoded');
                    let url: string = (this.env.apiURL + '/Token/Get');
                    let exit: boolean = false;

                    this.env.isStartAuthen = true;

                    let result: any = await this.doHttpMethod('POST', url, params, { headers: headers });

                    if (result !== null) {
                        let token: any = JSON.parse(result.split('').reverse().join(''));

                        if (token.id_token !== undefined) {
                            let payload: any | null = this.jwtHelperService.decodeToken(token.id_token);
                            let CUID: string = this.doGetCUID([payload.ppid]);

                            localStorage.setItem(this.env.localStorageKey.bearerToken, btoa(btoa(CUID.split('').reverse().join('')) + '.' + btoa(token.id_token.split('').reverse().join(''))));
                            exit = true;
                        }
                    }

                    this.env.isStartAuthen = false;

                    return exit;
                }
            }
        }

        return false;
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

    doSetAuthenInfo(message: string): void {
        let isAuthenticated: boolean = this.env.authenInfo.isAuthenticated;
        let isReAuthenticated: boolean = this.env.authenInfo.isReAuthenticated;
        let isRole: boolean = this.env.authenInfo.isRole;

        if (message === this.OK) {
            isAuthenticated = true;
            isReAuthenticated = false;
            isRole = false;
        }

        if ([this.UNAUTHORIZED, this.TOKEN_INVALID].filter((dr: string) => dr === message).length > 0) {
            isAuthenticated = false;
            isReAuthenticated = false;
            isRole = false;
        }

        if ([this.TOKEN_EXPIRED, this.USER_NOT_FOUND].filter((dr: string) => dr === message).length > 0) {
            isAuthenticated = true;
            isReAuthenticated = true;
            isRole = false;
        }

        this.env.authenInfo = {
            isAuthenticated: isAuthenticated,
            isReAuthenticated: isReAuthenticated,
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
        if (msg === this.DATABASE_CONNECTION_FAIL)
            return {
                content: 'error.databaseConnectionFail.label',
                description: ''
            };

        if (msg === this.UNAUTHORIZED)
            return {
                content: 'error.unauthorized.label',
                description: 'signin.please.again.label'
            };

        if (msg === this.TOKEN_INVALID)
            return {
                content: 'error.token.invalid.label',
                description: 'signin.please.again.label'
            };

        if (msg === this.TOKEN_EXPIRED)
            return {
                content: 'error.token.expired.label',
                description: 'signin.please.again.label'
            };

        if (msg === this.USER_NOT_FOUND)
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

                let result: any = await this.doHttpMethod('GET', url, null, option);

                if (result !== null) {
                    if (result.statusCode === 200 && result.message === 'OK')
                        return result['data'];
                    else {
                        if (result.statusCode === 401 || result.statusCode === 404)
                            this.doSetAuthenInfo(result.message);

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
                this.doSetAuthenInfo(this.UNAUTHORIZED);

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

                let result: any = await this.doHttpMethod(method.toUpperCase(), url, data, option);

                if (result !== null) {
                    if (result.statusCode === 200 && result.message === 'OK') {
                        return result['data'];
                    }
                    else {
                        if (result.statusCode === 401 || result.statusCode === 404)
                            this.doSetAuthenInfo(result.message);

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
                this.doSetAuthenInfo(this.UNAUTHORIZED);

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
