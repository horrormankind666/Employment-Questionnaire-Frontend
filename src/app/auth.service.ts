/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๐๑/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AppService } from './app.service';
import { Schema } from './model.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private jwtHelperService: JwtHelperService,
        private appService: AppService
    ) {
    }

    private parseToken(str: string): Schema.BearerToken | null {
        try {
            let strDecode: string = atob(str);
            let strDecodeSplit: string[] = strDecode.split('.');

            return ({
                CUID: atob(strDecodeSplit[0]).split('').reverse().join(''),
                token: atob(strDecodeSplit[1]).split('').reverse().join('')
            });
        }
        catch {
            return null;
         }
    }

    private userInfo: Schema.User | null = null;

    get getUserInfo(): Schema.User | null {
        return this.userInfo;
    }

    async getAuthenInfo(route?: ActivatedRouteSnapshot) {
        let bearerToken: string | null = localStorage.getItem(this.appService.env.localStorageKey.bearerToken);

        if (bearerToken !== null) {
            let bearerTokenInfo: Schema.BearerToken | null = this.parseToken(bearerToken);

            if (bearerTokenInfo !== null) {
                try {
                    if (!this.jwtHelperService.isTokenExpired(bearerTokenInfo.token)) {
                        let CUIDInfo: string[] | null = this.appService.parseCUID(bearerTokenInfo.CUID);
                        let PPID: string | null = (CUIDInfo !== null ? CUIDInfo[0] : null);
                        let payload: any | null = this.jwtHelperService.decodeToken(bearerTokenInfo.token);

                        if (PPID !== null && payload !== null && PPID === payload.ppid) {
                            if (this.getUserInfo === null) {
                                this.appService.env.authenInfo = {
                                    isAuthenticated: true,
                                    isRole: false,
                                    message: 'OK'
                                };
                                this.userInfo = {
                                    PPID: PPID,
                                    givenName: payload.given_name,
                                    familyName: payload.family_name,
                                    gender: 'M',
                                    email: payload.email,
                                    initials: ((payload.given_name ? payload.given_name[0].toUpperCase() : '') + (payload.family_name ? payload.family_name[0].toUpperCase() : ''))
                                };
                            }
                        }
                        else {
                            this.appService.env.authenInfo = {
                                isAuthenticated: false,
                                isRole: false,
                                message: 'User Not Found'
                            };
                            this.userInfo = null;
                        }
                    }
                    else {
                        this.appService.env.authenInfo = {
                            isAuthenticated: false,
                            isRole: false,
                            message: 'Token Expired'
                        };
                        this.userInfo = null;
                    }
                }
                catch(error) {
                    bearerTokenInfo = null;
                }
            }

            if (bearerTokenInfo === null) {
                this.appService.env.authenInfo = {
                    isAuthenticated: false,
                    isRole: false,
                    message: 'Token Invalid'
                };
                this.userInfo = null;
            }
        }
        else {
            this.appService.env.authenInfo = {
                isAuthenticated: false,
                isRole: false,
                message: 'Unauthorized'
            };
            this.userInfo = null;
        }
    }
}
