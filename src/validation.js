import React from "react";
import {Trans} from "react-i18next";

export const IN_PROGRESS = -1;
export const IS_VALID = 1;
export const ERR_REQUIRED = 100;
export const ERR_MIN_LENGTH = 101;
export const ERR_IS_EMAIL = 102;
export const ERR_IS_NUMERIC = 103;
export const ERR_IS_TEL = 104;
export const ERR_PASSWORD_NOT_MATCH = 105;
export const ERR_EMAIL_EXISTS = 106;
export const ERR_USER_NAME_EXISTS = 107;
export const ERR_CHECKING_FAILED = 109;
export const ERR_IS_USERNAME = 110;



export const checkValidity = (value, rules, event, dataSet, setDataSet) => {

    let isValid = IS_VALID;

    if (!rules && !event) {
        return IS_VALID;
    }

    if (rules.required && isValid === IS_VALID) {
        isValid = (value.length > 0 || (typeof value === 'string' && value.trim() !== '')) ? IS_VALID : ERR_REQUIRED;
    }

    if (rules.minLength && isValid === IS_VALID) {
        isValid = (value.length >= rules.minLength) ? IS_VALID : ERR_MIN_LENGTH;
    }

    if (rules.isEmail && isValid === IS_VALID) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = (pattern.test(value)) ? IS_VALID : ERR_IS_EMAIL;
    }

    if (rules.isUsername && isValid === IS_VALID) {
        const pattern = /^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
        isValid = (pattern.test(value)) ? IS_VALID : ERR_IS_USERNAME;
    }

    if (rules.isNumeric && isValid === IS_VALID) {
        const pattern = /^\d+$/;
        isValid = (pattern.test(value)) ? IS_VALID : ERR_IS_NUMERIC;
    }

    if (rules.isTel && isValid === IS_VALID) {
        const pattern = /^\+\d+$/;
        isValid = (pattern.test(value)) ? IS_VALID : ERR_IS_TEL;
    }


    if (event) isValid = event(isValid, dataSet, setDataSet);

    return isValid;
};


export const errMsg = (errNo) => {

    switch (errNo) {

        case ERR_REQUIRED:
            return <Trans>Required field</Trans>;
        case ERR_IS_EMAIL:
            return <Trans>Invalid email</Trans>;
        case ERR_IS_NUMERIC:
            return <Trans>Only numbers allowed</Trans>;
        case ERR_IS_TEL:
            return <Trans>Only phone numbers allowed (started with +)</Trans>;
        case ERR_MIN_LENGTH:
            return <Trans>Too short (8 chars at least)</Trans>;
        case ERR_PASSWORD_NOT_MATCH:
            return <Trans>Password does not match</Trans>;
        case ERR_EMAIL_EXISTS:
            return <Trans>Email is already registered!</Trans>;
        case ERR_USER_NAME_EXISTS:
            return <Trans>User name is taken!</Trans>;
        case IN_PROGRESS:
            return <Trans i18nKey={"CheckProgress"}>Checking in progress...</Trans>;
        case ERR_CHECKING_FAILED:
            return <Trans i18nKey={"CheckFailed"}>Checking failed! please try again</Trans>;
        case ERR_IS_USERNAME:
            return <Trans>Invalid Username (only letters (a-z), numbers and dash are allowed)</Trans>;
        default:
            return "";

    }

};