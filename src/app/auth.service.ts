/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๓๐/๐๓/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AppService } from './app.service';
import { Schema, ModelService } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private jwtHelperService: JwtHelperService,
        private appService: AppService,
        private modelService: ModelService
    ) {
    }

    public doParseToken(str: string): Schema.BearerToken | null {
        try {
            let strDecode: string = atob(str);
            let strDecodes: Array<string> = strDecode.split('.');

            return ({
                CUID: atob(strDecodes[0]).split('').reverse().join(''),
                token: atob(strDecodes[1]).split('').reverse().join(''),
                tokenExpiration: parseFloat(atob(strDecodes[2]).split('').reverse().join(''))
            });
        }
        catch {
            return null;
         }
    }

    userInfo: Schema.User | null = null;

    get getUserInfo(): Schema.User | null {
        return this.userInfo;
    }

    async doGetAuthenInfo(route?: ActivatedRouteSnapshot) {
        let bearerToken: string | null = localStorage.getItem(this.appService.env.localStorageKey.bearerToken);
        let message: string = '';

        if (bearerToken !== null) {
            let bearerTokenInfo: Schema.BearerToken | null = this.doParseToken(bearerToken);

            if (bearerTokenInfo !== null) {
                try {
                    let CUIDInfos: Array<string> | null = this.appService.doParseCUID(bearerTokenInfo.CUID);
                    let PPID: string | null = (CUIDInfos !== null ? CUIDInfos[0] : null);
                    let payload: any | null = this.jwtHelperService.decodeToken(bearerTokenInfo.token);

                    if (this.appService.doIsTokenExpired(bearerTokenInfo.tokenExpiration) === false) {
                    /*
                    if (this.jwtHelperService.isTokenExpired(bearerTokenInfo.token) === false) {
                    */
                        if (PPID !== null && payload !== null && PPID === payload.ppid) {
                            if (this.appService.env.authenInfo.isAuthenticated === false)
                                this.userInfo = null;

                            if (this.getUserInfo === null) {
                                this.userInfo = await this.modelService.student.doGet(false);
                                
                                if (this.userInfo !== null) {
                                    this.appService.doSetAuthenInfo(this.appService.OK);
                                    this.userInfo.PPID = PPID;
                                    this.userInfo.email = payload.email;
                                    this.userInfo.accountName = payload.winaccountname;
                                    this.userInfo.givenName = payload.given_name;
                                    this.userInfo.familyName = payload.family_name;
                                    this.userInfo.initials = ((payload.given_name !== undefined ? payload.given_name[0].toUpperCase() : '') + (payload.family_name !== undefined ? payload.family_name[0].toUpperCase() : ''));
                                }
                                else
                                    message = this.appService.USER_NOT_FOUND;
                            }
                        }
                        else
                            message = this.appService.USER_NOT_FOUND
                    }
                    else
                        message = this.appService.TOKEN_EXPIRED;

                    if ([this.appService.TOKEN_EXPIRED, this.appService.USER_NOT_FOUND].filter((dr: string) => dr === message).length > 0) {
                        this.appService.doSetAuthenInfo(message);
                        this.userInfo = {
                            PPID: ((PPID !== null && payload !== null && PPID === payload.ppid) ? PPID : ''),
                            email: (payload.email !== undefined ? payload.email : payload.upn),
                            accountName: (payload.winaccountname !== undefined ? payload.winaccountname : ''),
                            givenName: (payload.given_name !== undefined ? payload.given_name : ''),
                            familyName: (payload.family_name !== undefined ? payload.family_name : ''),
                            initials: ((payload.given_name !== undefined ? payload.given_name : payload.upn)[0].toUpperCase() + (payload.family_name !== undefined ? payload.family_name[0].toUpperCase() : '')),
                        };
                    }
                }
                catch(error) {
                    console.log(error);
                    bearerTokenInfo = null;
                }
            }

            if (bearerTokenInfo === null) {
                this.appService.doSetAuthenInfo(this.appService.TOKEN_INVALID);
                this.userInfo = null;
            }
        }
        else {
            this.appService.doSetAuthenInfo(this.appService.UNAUTHORIZED);
            this.userInfo = null;
        }
    }
}
