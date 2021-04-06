import React, { useState, useReducer, useCallback } from 'react';
import 'react-i18next';
import { apiSubmitFormPost } from '@semiorbit/api-central';

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
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
  updateDataSet: function updateDataSet(newData) {},
  updateDataStructure: function updateDataStructure(newDataStructure) {},
  inputChangedHandler: function inputChangedHandler(fld, val) {},
  inputBlurHandler: function inputBlurHandler(fld, val) {},
  updateField: function updateField(fld, updatedProperties) {},
  onSubmitHandler: function onSubmitHandler(e) {},
  reset: function reset() {},
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
      newDs = updateObject(state, props);
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
      updateDataSet: updateDataSet,
      updateDataStructure: updateDataStructure,
      inputChangedHandler: inputChangedHandler,
      inputBlurHandler: inputBlurHandler,
      updateField: updateField,
      onSubmitHandler: onSubmitHandler,
      reset: reset,
      validateAll: validateAll
    }
  }, props.children);
};

export default FormContextProvider;
export { FormContext };
