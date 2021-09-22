/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๑/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(
        private title: Title,
        private translateService: TranslateService
    ) { }

    env = environment;

    setDefaultLang(): void {
        this.translateService.setDefaultLang(this.env.lang);
        this.translateService.use(this.env.lang);

        this.translateService.get('systemName.label').subscribe((result: string) => {
            this.title.setTitle(result);
        });
    }
}
