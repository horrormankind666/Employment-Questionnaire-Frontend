/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๕/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService
    ) {
    }

    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        this.appService.env.route.path = (route.routeConfig !== null ? (route.routeConfig.path !== undefined ? route.routeConfig.path : '') : '');

        try {
            await this.authService.doGetAuthenInfo(route);

            if (this.appService.env.authenInfo.isAuthenticated === false) {
                localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);

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
                    }

                    let messageError: any | null = this.appService.doGetMessagei18n(this.appService.env.authenInfo.message);

                    if (messageError !== null && this.appService.env.isStartAuthen === false)
                        this.modalService.doGetModal('danger', false, messageError.content, messageError.description);

                    return false;
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
