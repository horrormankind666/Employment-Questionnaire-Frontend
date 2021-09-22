/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๑/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppService } from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor (
        private router: Router,
        public appService: AppService
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart:
                    /*
                    this.modalService.closeAllModal();
                    */

                    appService.env.loading.isShow = true;
                    appService.env.loading.isPage = true;
                    break;
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    setTimeout(() => {
                        appService.env.loading.isShow = false;
                        appService.env.loading.isPage = false;
                        /*
                        this.userBackgrondColor = this.appService.getRandomColor();

                        if (this.appService.authenInfo.isAuthenticated)
                            this.setActiveSidebarMenu(true);
                        else
                            this.isActiveSidebarMenu = false;

                        this.setFooterlayout();
                        */
                    }, 0);
                    break;
                default:
                    break;
            }
        });
    }

    ngOnInit(): void {
        this.appService.setDefaultLang();
    }
}
