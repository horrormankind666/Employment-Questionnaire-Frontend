/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๑๐/๐๑/๒๕๖๕>
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

    private doParseToken(str: string): Schema.BearerToken | null {
        try {
            let strDecode: string = atob(str);
            let strDecodes: Array<string> = strDecode.split('.');

            return ({
                CUID: atob(strDecodes[0]).split('').reverse().join(''),
                token: atob(strDecodes[1]).split('').reverse().join('')
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

        if (bearerToken !== null) {
            let bearerTokenInfo: Schema.BearerToken | null = this.doParseToken(bearerToken);

            if (bearerTokenInfo !== null) {
                try {
                    if (this.jwtHelperService.isTokenExpired(bearerTokenInfo.token) === false) {
                        let CUIDInfos: Array<string> | null = this.appService.doParseCUID(bearerTokenInfo.CUID);
                        let PPID: string | null = (CUIDInfos !== null ? CUIDInfos[0] : null);
                        let payload: any | null = this.jwtHelperService.decodeToken(bearerTokenInfo.token);

                        if (PPID !== null && payload !== null && PPID === payload.ppid) {
                            if (this.appService.env.authenInfo.isAuthenticated === false)
                                this.userInfo = null;

                            if (this.getUserInfo === null) {
                                this.appService.doSetAuthenInfo(true, false, 'OK');
                                this.userInfo = {
                                    PPID: PPID,
                                    email: payload.email,
                                    accountName: payload.winaccountname,
                                    givenName: payload.given_name,
                                    familyName: payload.family_name,
                                    initials: ((payload.given_name ? payload.given_name[0].toUpperCase() : '') + (payload.family_name ? payload.family_name[0].toUpperCase() : '')),
                                    perPersonID: null,
                                    studentCode: null,
                                    IDCard: '3770600658218',
                                    titlePrefix: {
                                        th: 'นาย',
                                        en: 'Mr.'
                                    },
                                    firstName: {
                                        th: 'ยุทธภูมิ',
                                        en: 'YUTTHAPHOOM'
                                    },
                                    middleName: null,
                                    lastName: {
                                        th: 'ตวันนา',
                                        en: 'TAWANNA'
                                    },
                                    instituteName: {
                                        th: 'มหาวิทยาลัยมหิดล',
                                        en: 'MAHIDOL UNIVERSITY'
                                    },
                                    facultyID: 'RA-01',
                                    facultyCode: 'RA',
                                    facultyName: {
                                        th: 'คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี',
                                        en: 'FACULTY OF MEDICINE RAMATHIBODI HOSPITAL'
                                    },
                                    programID: 'RANSB-001-B',
                                    programCode: 'RANSB',
                                    majorCode: '-',
                                    groupNum: '0',
                                    degreeLevelName: {
                                        th: 'ปริญญาตรี',
                                        en: 'BACHELOR'
                                    },
                                    programName: {
                                        th: 'พยาบาลศาสตรบัณฑิต',
                                        en: 'NURSING SCIENCE'
                                    },
                                    degreeName: {
                                        th: 'พยาบาลศาสตรบัณฑิต',
                                        en: 'BACHELOR OF NURSING SCIENCE'
                                    },
                                    branchID: 'SS-01',
                                    branchName: {
                                        th: 'สาขาสังคมศาสตร์และมนุษยศาสตร์',
                                        en: 'HUMANITIES AND SOCIAL SCIENCE'
                                    },
                                    classYear: 4,
                                    yearEntry: '2559',
                                    gender: 'M',
                                    birthDate: '1997-05-27 00:00:00.000',
                                    nationalityName: {
                                        th: 'ไทย',
                                        en: 'THAI'
                                    },
                                    nationality2Letter: 'TH',
                                    nationality3Letter: 'THA',
                                    raceName: {
                                        th: 'ไทย',
                                        en: 'THAI',
                                    },
                                    race2Letter: 'TH',
                                    race3Letter: 'THA'
                                };
                            }
                        }
                        else {
                            this.appService.doSetAuthenInfo(false, false, 'User Not Found');
                            this.userInfo = null;
                        }
                    }
                    else {
                        this.appService.doSetAuthenInfo(false, false, 'Token Expired');
                        this.userInfo = null;
                    }
                }
                catch(error) {
                    bearerTokenInfo = null;
                }
            }

            if (bearerTokenInfo === null) {
                this.appService.doSetAuthenInfo(false, false, 'Token Invalid');
                this.userInfo = null;
            }
        }
        else {
            this.appService.doSetAuthenInfo(false, false, 'Unauthorized');
            this.userInfo = null;
        }
    }
}
