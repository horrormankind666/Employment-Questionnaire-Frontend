/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๙/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template:  `
        <div
            class="page-container"
            id="not-found-page">
            <div
                class="page-header h-auto">
                <div
                    class="title heading text-center text-2xl">
                    {{ 'error.pageNotFound.label' | translate | titlecase }}
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class PageNotFoundComponent {
}
