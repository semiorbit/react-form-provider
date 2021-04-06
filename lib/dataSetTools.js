import React from 'react';
import { Trans } from 'react-i18next';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var IN_PROGRESS = -1;
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

var dsField = function dsField(fld, ctx) {
  return {
    value: ctx.ds[fld].value,
    onChange: function onChange(e) {
      return ctx.inputChangedHandler(fld, e.target.value);
    },
    onBlur: function onBlur(e) {
      return ctx.inputBlurHandler(fld, e.target.value);
    },
    error: ctx.ds[fld].valid > 1,
    helperText: errMsg(ctx.ds[fld].valid),
    label: ctx.dsStructure[fld].label
  };
};
var linkDataSet = function linkDataSet(formCtx) {
  return {
    ds: formCtx.dataSet,
    dsStructure: formCtx.dataStructure,
    inputChangedHandler: formCtx.inputChangedHandler,
    inputBlurHandler: formCtx.inputBlurHandler,
    formIsValid: formCtx.formIsValid,
    submitHandler: formCtx.onSubmitHandler,
    validateAll: formCtx.validateAll,
    isLoading: formCtx.formIsSubmitting
  };
};
var updateObject = function updateObject(oldObject, updatedProperties) {
  return _objectSpread2(_objectSpread2({}, oldObject), updatedProperties);
};
var firstElementOf = function firstElementOf(obj) {
  return obj[Object.keys(obj)[0]];
};

export { dsField, firstElementOf, linkDataSet, updateObject };
