import React, { useState, useReducer, useCallback } from 'react';
import 'react-i18next';
import { apiSubmitFormPost, apiCall } from '@semiorbit/api-central';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
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
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var IS_VALID = 1;
var ERR_REQUIRED = 100;
var ERR_MIN_LENGTH = 101;
var ERR_IS_EMAIL = 102;
var ERR_IS_NUMERIC = 103;
var ERR_IS_TEL = 104;
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

var updateObject = function updateObject(oldObject, updatedProperties) {
  return _objectSpread2(_objectSpread2({}, oldObject), updatedProperties);
};

var FormContext = /*#__PURE__*/React.createContext({
  dataSet: {},
  dataStructure: {},
  formConfig: {},
  formIsValid: false,
  formIsSubmitting: false,
  response: null,
  error: null,
  loadData: function loadData(data) {},
  loadDataFrom: function loadDataFrom(url, params) {},
  updateDataSet: function updateDataSet(newData) {},
  updateDataStructure: function updateDataStructure(newDataStructure) {},
  inputChangedHandler: function inputChangedHandler(fld, val) {},
  inputBlurHandler: function inputBlurHandler(fld, val) {},
  updateField: function updateField(fld, updatedProperties) {},
  onSubmitHandler: function onSubmitHandler(e) {},
  reset: function reset() {},
  result: function result() {},
  resultSuccess: function resultSuccess() {},
  validateAll: function validateAll() {}
});
var FormContextProvider = function FormContextProvider(props) {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    formIsValid = _useState2[0],
    setFormIsValid = _useState2[1];
  var dataSetIsValid = function dataSetIsValid(ds) {
    for (var fld in ds) {
      if (ds.hasOwnProperty(fld) && ds[fld].valid !== IS_VALID) return false;
    }
    return true;
  };
  var dsReducer = function dsReducer(state, action) {
    var newDs;
    if (action.hasOwnProperty('fld')) {
      var updatedElem = updateObject(state[action.fld], action.props);
      newDs = updateObject(state, _defineProperty({}, action.fld, updatedElem));
    } else {
      newDs = updateObject(state, action.props);
    }
    setFormIsValid(dataSetIsValid(newDs));
    return newDs;
  };
  var _useReducer = useReducer(dsReducer, props.initDataSet),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    dataSet = _useReducer2[0],
    dispatch = _useReducer2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    formIsSubmitting = _useState4[0],
    setFormIsSubmitting = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    response = _useState6[0],
    setResponse = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var dataStructure = props.initDataStructure;
  var formConfig = _objectSpread2({
    action: '',
    method: apiSubmitFormPost
  }, props.initFormConfig);
  var updateField = function updateField(fld, updatedProperties) {
    dispatch({
      fld: fld,
      props: updatedProperties
    });
  };
  var updateDataSet = function updateDataSet(newData) {
    dispatch({
      props: newData
    });
  };
  var updateDataStructure = function updateDataStructure(newDataStructure) {
    dataStructure = updateObject(dataStructure, newDataStructure);
  };
  var inputChangedHandler = function inputChangedHandler(fld, val) {
    updateField(fld, {
      value: val,
      valid: 0,
      touched: true
    });
  };
  var inputBlurHandler = function inputBlurHandler(fld, val) {
    updateField(fld, {
      value: val,
      touched: true,
      valid: dataStructure.hasOwnProperty(fld) ? checkValidity(val, dataStructure[fld].validation, dataStructure[fld].onValidation, dataSet, updateDataSet) : IS_VALID
    });
  };
  var validateAll = function validateAll() {
    var res = true;
    for (var fld in dataSet) {
      if (dataSet.hasOwnProperty(fld)) {
        if (dataSet[fld].valid !== IS_VALID) {
          var isValid = dataStructure.hasOwnProperty(fld) ? checkValidity(dataSet[fld].value, dataStructure[fld].validation, dataStructure[fld].onValidation, dataSet, updateDataSet) : IS_VALID;
          updateField(fld, {
            valid: isValid
          });
          if (isValid !== IS_VALID) res = false;
        }
      }
    }
    return res;
  };
  var prepareFormData = function prepareFormData() {
    var params = new URLSearchParams();
    for (var fld in dataSet) {
      if (dataSet.hasOwnProperty(fld) && dataSet[fld].touched) {
        params.append(fld, dataSet[fld].value);
      }
    }
    return params;
  };
  var loadData = function loadData(data) {
    var updatedData = {};
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        updatedData[key] = {
          value: data[key],
          valid: 1,
          touched: false
        };
      }
    }
    updateDataSet(updatedData);
  };
  var loadDataFrom = function loadDataFrom(url, params) {
    apiCall(url, params).then(function (response) {
      loadData(response.data);
    }).catch(function () {
      reset();
    });
  };
  var onSubmitHandler = function onSubmitHandler(e) {
    e.preventDefault();
    if (!formIsSubmitting && validateAll()) {
      setFormIsSubmitting(true);
      formConfig.method(formConfig.action, prepareFormData()).then(function (response) {
        setFormIsSubmitting(false);
        setResponse(response);
      }).catch(function (error) {
        setFormIsSubmitting(false);
        setError(error);
      });
    }
  };
  var result = useCallback(function () {
    if (response && response.data.hasOwnProperty('res')) return response.data.res;else return null;
  }, [response]);
  var resultSuccess = useCallback(function () {
    return response && response.data.hasOwnProperty('res') && response.data.res === 1;
  }, [response]);
  var reset = useCallback(function () {
    setError(null);
    setResponse(null);
  }, []);
  return /*#__PURE__*/React.createElement(FormContext.Provider, {
    value: {
      dataSet: dataSet,
      dataStructure: dataStructure,
      formConfig: formConfig,
      formIsValid: formIsValid,
      formIsSubmitting: formIsSubmitting,
      response: response,
      error: error,
      loadData: loadData,
      loadDataFrom: loadDataFrom,
      updateDataSet: updateDataSet,
      updateDataStructure: updateDataStructure,
      inputChangedHandler: inputChangedHandler,
      inputBlurHandler: inputBlurHandler,
      updateField: updateField,
      onSubmitHandler: onSubmitHandler,
      reset: reset,
      result: result,
      resultSuccess: resultSuccess,
      validateAll: validateAll
    }
  }, props.children);
};

var withFormProvider = function withFormProvider(Component, initDataSet, initDataStructure, initFormConfig) {
  return function (props) {
    return /*#__PURE__*/React.createElement(FormContextProvider, {
      initDataSet: initDataSet,
      initDataStructure: initDataStructure,
      initFormConfig: initFormConfig
    }, /*#__PURE__*/React.createElement(Component, props));
  };
};

export { FormContext, FormContextProvider, withFormProvider };
