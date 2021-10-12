/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๒/๑๐/๒๕๖๔>
Description : <>
=============================================
*/

'use strict';

export const environment = {
    environmentName: 'production',
    production: true,
    devYear: 2021,
    lang: 'th',
    apiURL: 'https://.../API',
    isFirstload: false,
    isLoading: false,
    authenInfo: {
        isAuthenticated: false,
        isRole: false,
        message: ''
    },
    localStorageKey: {
        bearerToken: 'EmploymentQuestionnaireBearerToken'
    },
    route: {
        path: ''
    }
};
