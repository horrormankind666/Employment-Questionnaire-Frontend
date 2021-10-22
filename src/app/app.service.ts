/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    setBearerToken() {
        let CUID: string = this.getCUID(['6unbq648oglyxf90ds']);
        let token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSIsImtpZCI6IlU3TWZHMk5lTXRqZjlmOC1iWldTVXl1LUVjRSJ9.eyJhdWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJpc3MiOiJodHRwczovL2lkcC5tYWhpZG9sLmFjLnRoL2FkZnMiLCJpYXQiOjE2MzQ5MjEwOTgsIm5iZiI6MTYzNDkyMTA5OCwiZXhwIjoxNjM0OTI0Njk4LCJhdXRoX3RpbWUiOjE2MzQ5MTMzMzgsIm5vbmNlIjoiNjM3NzA1MTc4OTg3MjIwMDMzLlpqSTROR1F6TURJdE1qSTJOQzAwTkRZMUxXSmxNemt0WXpBNFlqRmlaREJoTW1Ka05UbGhZVE0wT0dFdE9HRXhZUzAwWlRrd0xXRTJZelV0TTJGbFl6Z3pZek0yTXpjNCIsInN1YiI6ImhRdVBXeTFnZSt0ZWtMRlQ4WmxHNEQzaXNVL2FHQTR2WkhnditLUGN3NVk9Iiwic2lkIjoiUy0xLTUtMjEtMjM2ODEzMDQxMi0zMjQ2OTQ5NDYwLTI1MzEzNzM3NDMtMzY0NTkiLCJ1cG4iOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsInVuaXF1ZV9uYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZW1haWwiOiJ5dXR0aGFwaG9vbS50YXdAbWFoaWRvbC5hYy50aCIsIndpbmFjY291bnRuYW1lIjoieXV0dGhhcGhvb20udGF3IiwiZ2l2ZW5fbmFtZSI6Illvb3RhcG9vbSIsImZhbWlseV9uYW1lIjoiVGF2YW5uYSIsInBwaWQiOiI2dW5icTY0OG9nbHl4ZjkwZHMiLCJhcHB0eXBlIjoiQ29uZmlkZW50aWFsIiwiYXBwaWQiOiJlYTRmNWJhNy1iNTliLTQ2NzMtODRlNS00Mjk2NzBiMDkwODEiLCJhdXRobWV0aG9kIjoidXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmRQcm90ZWN0ZWRUcmFuc3BvcnQiLCJ2ZXIiOiIxLjAiLCJzY3AiOiJhbGxhdGNsYWltcyBvcGVuaWQiLCJjX2hhc2giOiIxeTdwdkgxNzlCWGVrMm5OVjhkSjF3In0.PyRVCqEn3AqTvaApyJ4kdq3wl69VeM-3voXS-JpALaPLuF-q75_YkF7xt5SwsWZZh7dWTB2c_DuUeVVB5pSCSHskQbDZgeNqi6S6VYJL_l-gjKu2wdbyGRjhWaH34se6xnm_NeiLONseKuwwoyxdwcMjzsdiOOCTI3X_MGFIM-Ot85vf4WxpTFY6zbSmRdoSA4lQmlvf8MnwJEsLDKBlVTU6P5dxnSY6b-ZunP-GIlCNm42XQlN6gjkyD7c9j8-izgkJs8_3m4qe44Rvawf3U7QSJRF3gz44LeVWV9QaNWmHQfdmRxOAm_TWBoIWAfBusOTTNxtjff61bA5Pl-uWRg';
        let bearerToken: string = btoa(btoa(CUID.split('').reverse().join('')) + '.' + btoa(token.split('').reverse().join('')));

        localStorage.setItem(this.env.localStorageKey.bearerToken, bearerToken);
    }

    setDefaultLang(lang?: string): void {
        this.env.lang = (!lang ? this.env.lang : lang);

        this.translateService.setDefaultLang(this.env.lang);
        this.translateService.use(this.env.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }

    setLoading(isLoading: boolean): void {
        this.env.isLoading = isLoading;

        if (isLoading)
            document.body.classList.add('overflow-hidden');
        else
            document.body.classList.remove('overflow-hidden');
    }

    generateRandAlphaNumStr(len: number = 10) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let result: string = '';

        for (let i = 0; i < len; i++) {
            const rnum = Math.floor(Math.random() * chars.length);

            result += chars.substring(rnum, rnum + 1);
        }

        return result;
    }

    parseCUID(str: string): string[] | null {
        try {
            let strDecode = atob(str);
            let strDecodeSplit = strDecode.split('.');
            let data = strDecodeSplit[2];
            let dataReverse = data.split('').reverse().join('');
            let dataReverseDecode = atob(dataReverse);
            let dataReverseDecodeSplit = dataReverseDecode.split('.');

            return dataReverseDecodeSplit;
        }
        catch {
            return null;
        }
    }

    async httpMethod(method: string, url: string, data: string, option: {}): Promise<any | null> {
        try {
            if (method === 'GET')
                return await this.http.get(url, option).toPromise();

            if (method === 'POST')
                return await this.http.post(url, data, option).toPromise()

            if (method === 'PUT')
                return await this.http.put(url, data, option).toPromise()
        } catch(error: any) {
            console.log(error);

            this.modalService.getModalError(false, error.message);

            return null;
        }
    }

    getCUID(data: any = []): string {
        let randAlphaNumStr: string = this.generateRandAlphaNumStr(20);

        return (
            btoa(
                (btoa(randAlphaNumStr).split('').reverse().join('')) + '.' +
                (randAlphaNumStr.split('').reverse().join('')) + '.' +
                (btoa(data.join('.')).split('').reverse().join(''))
            )
        );
    }

    getRandomColor(): string {
        let color: string = Math.floor(0x1000000 * Math.random()).toString(16);

        return ('#' + ('000000' + color).slice(-6)).toUpperCase();
    }

    getMessagei18n(msg: string): any | null {
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

    getCurrentDateTime(): {} {
        return {
            date: formatDate(new Date(), 'dd/MM/yyyy', 'en'),
            time: formatDate(new Date(), 'HH:mm:ss', 'en')
        };
    }

    async getDataSource(routePrefix: string, action: string, query?: string, showError?: boolean): Promise<[]> {
        try {
            routePrefix = (routePrefix === undefined ? '' : routePrefix);
            action = (action === undefined ? '' : action);
            query = (query === undefined || query.length === 0 ? '' : query);

            let url = (this.env.apiURL + '/' + routePrefix + '/');
            let route = '';
            let option = {
                headers: new HttpHeaders().set('Authorization', ('Bearer ' + localStorage.getItem(this.env.localStorageKey.bearerToken)))
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

            let datetime: any = this.getCurrentDateTime();

            url += (route + query + '?ver=' + datetime.date + datetime.time);

            let result = await this.httpMethod('GET', url, '', option)

            if (result !== null) {
                if (result.statusCode === 200 && result.message === 'OK') {
                    return result['data'];
                }
                else {
                    if (result.statusCode === 401 || result.statusCode === 404) {
                        this.env.authenInfo = {
                            isAuthenticated: false,
                            isRole: false,
                            message: result.message
                        };
                    }

                    if (showError) {
                        let messageError: any | null = this.getMessagei18n(result.message);

                        if (messageError !== null)
                            this.modalService.getModalError(false, messageError.content, messageError.description);
                    }

                    return [];
                }
            }

            return result;
        }
        catch (error) {
            console.log(error);

            return [];
        }
    }
}
