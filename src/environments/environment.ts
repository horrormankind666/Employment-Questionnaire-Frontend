/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๑/๐๙/๒๕๖๔>
Modify date : <๑๘/๐๔/๒๕๖๕>
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
    isStartAuthen: false,
    authenInfo: {
        isAuthenticated: false,
        isReAuthenticated: false,
        isRole: false,
        message: ''
    },
    localStorageKey: {
        bearerToken: 'EmploymentQuestionnaireBearerToken',
        CUID: 'EmploymentQuestionnaireDoneAndSetCUID'
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
        redirectURL: 'http://localhost:4279',
        authorizationURL: 'https://idp.mahidol.ac.th/adfs/oauth2/authorize',
        tokenURL: 'https://idp.mahidol.ac.th/adfs/oauth2/token',
        logoutURL: 'https://idp.mahidol.ac.th/adfs/oauth2/logout',
    },
    msentConfig: {
        lang: 'TH',
        clientID: 'SIT_KEY_EMPLOYMENT',
        clientSecret: '82657b3d-b020-4f52-b447-a367c60a0357',
        consentURL: 'https://privacy-qas.mahidol.ac.th/Msent/Pages/consents.html',
        redirectURL: 'http://localhost:4279/'
    }
};
