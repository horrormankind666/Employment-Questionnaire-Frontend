/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๙/๐๙/๒๕๖๔>
Modify date : <๒๙/๐๙/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

import { Component } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    template:  `
        <div id="page-not-found">
            <div class="p-card-custom">
                <div class="p-card-header heading text-2xl mb-0">
                    {{ 'error.pageNotFound.label' | translate | titlecase }}
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class PageNotFoundComponent {
}
