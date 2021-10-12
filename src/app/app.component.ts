/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
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
        '(window: resize)': 'onResize($event)'
    },
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('footer', { static: false }) footer!: ElementRef;
    @ViewChild('copyright', { static: false }) copyright!: ElementRef;
    @ViewChild('muitLogo', { static: false }) muitLogo!: ElementRef;

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
                    modalService.closeAllModal();
                    appService.setLoading(true);
                    break;
                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError:
                    setTimeout(() => {
                        appService.setLoading(false);
                        appService.env.isFirstload = false;
                        this.setFooterlayout();
                    }, 1000);
                    break;
                default:
                    break;
            }
        });
    }

    avatarBackgroundColor: string = this.appService.getRandomColor();
    today: Date = new Date();
    toggle: any = {
        profile: {
            active: false
        }
    };

    ngOnInit(): void {
        this.appService.env.isFirstload = true;
        this.appService.setDefaultLang();
    }

    onResize(): void {
        this.setFooterlayout();
    }

    setFooterlayout(): void {
        setTimeout(() => {
            this.render.setStyle(this.copyright.nativeElement, 'width', `${this.footer.nativeElement.offsetWidth - this.muitLogo.nativeElement.offsetWidth - 40}px`);
        }, 0);
    }

    signIn(): void {
        this.appService.setBearerToken();
        this.router.navigate(['Questionnaire']);
    }

    signOut(): void {
        localStorage.removeItem(this.appService.env.localStorageKey.bearerToken);
        this.router.navigate(['SignOut']);
    }
}
