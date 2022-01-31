/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๒๕/๐๑/๒๕๖๕>
Description : <>
=============================================
*/

'use strict';

export const environment = {
    environmentName: 'production',
    production: true,
    devYear: 2021,
    lang: 'th',
    apiURL: 'https://employment.mahidol.ac.th/Questionnaire/API',
    isFirstload: false,
    isLoading: false,
    isStartAuthen: false,
    authenInfo: {
        isAuthenticated: false,
        isReAuthenticated: false,
        isRole: false,
        message: ''
    },
    localStorageKey: {
        bearerToken: 'EmploymentQuestionnaireBearerToken'
    },
    route: {
        path: ''
    },
    oauthConfig: {
        resourceID: '48af9268-6e52-4aaa-b9d3-140f434f7a58',
        clientID: '1e885f66-7503-4a27-b2fc-b553f7c7b739',
        clientSecret: 'ZSgPnakihgnv5IsRYEf2ERiA4w8XdzCcvq_xYmhN',
        scope: 'allatclaims',
        responseType: 'code',
        grantType: 'authorization_code',
        redirectURL: 'https://employment.mahidol.ac.th',
        authorizationURL: 'https://idp.mahidol.ac.th/adfs/oauth2/authorize',
        tokenURL: 'https://idp.mahidol.ac.th/adfs/oauth2/token',
        logoutURL: 'https://idp.mahidol.ac.th/adfs/oauth2/logout',
    }
};
