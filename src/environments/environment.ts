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
    environmentName: 'development',
    production: false,
    devYear: 2021,
    lang: 'th',
    apiURL: 'http://localhost:5000/API',
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
