/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๓/๑๒/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { ModalService } from './modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    host: {
        '(window: resize)': 'doWindowOnResize($event)'
    },
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('footer', { static: false }) footer: ElementRef | undefined;
    @ViewChild('copyright', { static: false }) copyright: ElementRef | undefined;
    @ViewChild('muitLogo', { static: false }) muitLogo: ElementRef | undefined;

    constructor (
        private render: Renderer2,
        private router: Router,
        public appService: AppService,
        public authService: AuthService,
        private modalService: ModalService
    ) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart:
                    modalService.doCloseAllModal();
                    appService.doSetLoading(true);
                    break;
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    setTimeout(() => {
                        appService.doSetLoading(false);
                        appService.env.isFirstload = false;
                        this.doSetFooterlayout();
                    }, 200);
                    break;
                default:
                    break;
            }
        });
    }

    avatarBackgroundColor: string = this.appService.doGetRandomColor();
    today: Date = new Date();
    profile = {
        panel: {
            toggle: false
        }
    };

    ngOnInit(): void {
        this.appService.env.isFirstload = true;
        this.appService.doSetDefaultLang();
    }

    doWindowOnResize(): void {
        this.doSetFooterlayout();
    }

    doSetFooterlayout(): void {
        setTimeout(() => {
            try {
                this.render.setStyle(this.copyright?.nativeElement, 'width', `${this.footer?.nativeElement.offsetWidth - this.muitLogo?.nativeElement.offsetWidth - 40}px`);
            }
            catch {
            }
        }, 0);
    }

    doSignIn(): void {
        this.appService.doSetBearerToken();
        this.router.navigate(['Home']);
    }

    doSignOut(): void {
        localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);
        this.router.navigate(['Home']);
    }
}
