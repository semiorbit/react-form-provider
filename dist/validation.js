import React from 'react';
import { Trans } from 'react-i18next';

var IN_PROGRESS = -1;
var IS_VALID = 1;
var ERR_REQUIRED = 100;
var ERR_MIN_LENGTH = 101;
var ERR_IS_EMAIL = 102;
var ERR_IS_NUMERIC = 103;
var ERR_IS_TEL = 104;
var ERR_PASSWORD_NOT_MATCH = 105;
var ERR_EMAIL_EXISTS = 106;
var ERR_USER_NAME_EXISTS = 107;
var ERR_CHECKING_FAILED = 109;
var ERR_IS_USERNAME = 110;
var checkValidity = function checkValidity(value, rules, event, dataSet, setDataSet) {
  var isValid = IS_VALID;
  if (!rules && !event) {
    return IS_VALID;
  }
  if (rules.required && isValid === IS_VALID) {
    isValid = value.length > 0 || typeof value === 'string' && value.trim() !== '' ? IS_VALID : ERR_REQUIRED;
  }
  if (rules.minLength && isValid === IS_VALID) {
    isValid = value.length >= rules.minLength ? IS_VALID : ERR_MIN_LENGTH;
  }
  if (rules.isEmail && isValid === IS_VALID) {
    var pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) ? IS_VALID : ERR_IS_EMAIL;
  }
  if (rules.isUsername && isValid === IS_VALID) {
    var _pattern = /^[a-zA-Z][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    isValid = _pattern.test(value) ? IS_VALID : ERR_IS_USERNAME;
  }
  if (rules.isNumeric && isValid === IS_VALID) {
    var _pattern2 = /^\d+$/;
    isValid = _pattern2.test(value) ? IS_VALID : ERR_IS_NUMERIC;
  }
  if (rules.isTel && isValid === IS_VALID) {
    var _pattern3 = /^\+\d+$/;
    isValid = _pattern3.test(value) ? IS_VALID : ERR_IS_TEL;
  }
  if (event) isValid = event(isValid, dataSet, setDataSet);
  return isValid;
};
var errMsg = function errMsg(errNo) {
  switch (errNo) {
    case ERR_REQUIRED:
      return /*#__PURE__*/React.createElement(Trans, null, "Required field");
    case ERR_IS_EMAIL:
      return /*#__PURE__*/React.createElement(Trans, null, "Invalid email");
    case ERR_IS_NUMERIC:
      return /*#__PURE__*/React.createElement(Trans, null, "Only numbers allowed");
    case ERR_IS_TEL:
      return /*#__PURE__*/React.createElement(Trans, null, "Only phone numbers allowed (started with +)");
    case ERR_MIN_LENGTH:
      return /*#__PURE__*/React.createElement(Trans, null, "Too short (8 chars at least)");
    case ERR_PASSWORD_NOT_MATCH:
      return /*#__PURE__*/React.createElement(Trans, null, "Password does not match");
    case ERR_EMAIL_EXISTS:
      return /*#__PURE__*/React.createElement(Trans, null, "Email is already registered!");
    case ERR_USER_NAME_EXISTS:
      return /*#__PURE__*/React.createElement(Trans, null, "User name is taken!");
    case IN_PROGRESS:
      return /*#__PURE__*/React.createElement(Trans, {
        i18nKey: "CheckProgress"
      }, "Checking in progress...");
    case ERR_CHECKING_FAILED:
      return /*#__PURE__*/React.createElement(Trans, {
        i18nKey: "CheckFailed"
      }, "Checking failed! please try again");
    case ERR_IS_USERNAME:
      return /*#__PURE__*/React.createElement(Trans, null, "Invalid Username (only letters (a-z), numbers and dash are allowed)");
    default:
      return "";
  }
};

export { ERR_CHECKING_FAILED, ERR_EMAIL_EXISTS, ERR_IS_EMAIL, ERR_IS_NUMERIC, ERR_IS_TEL, ERR_IS_USERNAME, ERR_MIN_LENGTH, ERR_PASSWORD_NOT_MATCH, ERR_REQUIRED, ERR_USER_NAME_EXISTS, IN_PROGRESS, IS_VALID, checkValidity, errMsg };
