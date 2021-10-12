/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๖/๐๙/๒๕๖๔>
Modify date : <๒๗/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private appService: AppService,
        private authService: AuthService,
        private modalService: ModalService
    ) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        this.appService.env.route.path = (route.routeConfig !== null ? (route.routeConfig.path !== undefined ? route.routeConfig.path : '') : '');

        try {
            await this.authService.getAuthenInfo(route);

            if (!this.appService.env.authenInfo.isAuthenticated) {
                localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);

                if (route.data.signin) {
                    let messageError: any | null = this.appService.getMessagei18n(this.appService.env.authenInfo.message);

                    if (messageError !== null)
                        this.modalService.getModalError(false, messageError.content, messageError.description);
                }

                if (state.url === '/SignOut')
                    this.router.navigate(['/']);

                if (this.appService.env.route.path === '**')
                    return true;

                return false;
            }

            return true;
        }
        catch(error) {
            console.log(error);

            return false;
        }
    }
}
