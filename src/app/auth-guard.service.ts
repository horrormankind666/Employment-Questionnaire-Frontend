/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๓/๐๔/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { Schema } from './model.service';
import { ModalService } from './modal/modal.service';
import { MSentService } from './m-sent.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService,
        private msentService: MSentService
    ) {
    }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        this.appService.env.route.path = (route.routeConfig !== null ? (route.routeConfig.path !== undefined ? route.routeConfig.path : '') : '');
        this.appService.ipAddress = await this.appService.doGetIPAddress();

        try {
            await this.authService.doGetAuthenInfo(route);

            if (this.appService.env.authenInfo.isAuthenticated === false) {
                localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);
                localStorage.removeItem(this.appService.env.localStorageKey.CUID);

                if (route.data.signin) {
                    let messageError: any | null = this.appService.doGetMessagei18n(this.appService.env.authenInfo.message);

                    if (messageError !== null && this.appService.env.isStartAuthen === false)
                        this.modalService.doGetModal('danger', false, messageError.content, messageError.description);
                }

                if (this.appService.env.route.path === '**')
                    return true;

                return false;
            }
            else {
                if (this.appService.env.authenInfo.isReAuthenticated === true) {
                    if (this.appService.env.authenInfo.message === this.appService.TOKEN_EXPIRED) {
                        this.appService.token = localStorage.getItem(this.appService.env.localStorageKey.bearerToken);
                        localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);
                        localStorage.removeItem(this.appService.env.localStorageKey.CUID);
                    }

                    let messageError: any | null = this.appService.doGetMessagei18n(this.appService.env.authenInfo.message);

                    if (messageError !== null && this.appService.env.isStartAuthen === false)
                        this.modalService.doGetModal('danger', false, messageError.content, messageError.description);

                    return false;
                }
                else {
                    if (this.appService.env.authenInfo.message === this.appService.OK) {
                        if (['', 'FillOut', 'PrivacyPolicy'].filter((dr: string) => dr === this.appService.env.route.path).length > 0) {
                            let consent: Schema.Consent | null = await this.msentService.doGetIsConsent();

                            if (consent.isError === false) {
                                if (consent.isConsent === false) {
                                    if (consent.page !== null) {
                                        if (['', 'FillOut'].filter((dr: string) => dr === this.appService.env.route.path).length > 0) {
                                            location.href = consent.page;

                                            return false;
                                        }
                                    }
                                }
                                else
                                    await this.msentService.doSetConsent(consent);
                            }
                        }
                    }
                }

            }

            return true;
        }
        catch(error) {
            console.log(error);

            return false;
        }
    }
}
