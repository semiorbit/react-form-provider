import React, {useCallback, useReducer, useState} from 'react';
import {updateObject} from "./dataSetTools";
import {checkValidity, IS_VALID} from "./validation";
import {apiSubmitFormPost} from "@semiorbit/api-central";


export const FormContext = React.createContext({
    dataSet: {},
    dataStructure: {},
    formConfig: {},
    formIsValid: false,
    formIsSubmitting: false,
    response: null,
    error: null,
    loadData: (data) => {},
    updateDataSet: (newData) => {},
    updateDataStructure: (newDataStructure) => {},
    inputChangedHandler: (fld, val) => {},
    inputBlurHandler: (fld, val) => {},
    updateField: (fld, updatedProperties) => {},
    onSubmitHandler: (e) => {},
    reset: () => {},
    result: () => {},
    resultSuccess: () => {},
    validateAll: () => {}
});

const FormContextProvider = props => {


    const [formIsValid, setFormIsValid] = useState(false);


    const dataSetIsValid = (ds) => {
        for (let fld in ds) {
            if (ds.hasOwnProperty(fld) && ds[fld].valid !== IS_VALID)
                return false;
        }
        return true;
    };

    const dsReducer = (state, action) => {

        let newDs;

        if (action.hasOwnProperty('fld')) {
            const updatedElem = updateObject(state[action.fld], action.props);
            newDs = updateObject(state, {
                [action.fld]: updatedElem
            });
        } else {
            newDs = updateObject(state, props);
        }

        setFormIsValid(dataSetIsValid(newDs));

        return newDs;

    }


    const [dataSet, dispatch] = useReducer(dsReducer, props.initDataSet);


    const [formIsSubmitting, setFormIsSubmitting] = useState(false);

    const [response, setResponse] = useState(null);

    const [error, setError] = useState(null);

    let dataStructure = props.initDataStructure;

    const formConfig = {
        action: '',
        method: apiSubmitFormPost,
        ...props.initFormConfig
    };




    const updateField = (fld, updatedProperties) => {
        dispatch({fld: fld, props: updatedProperties})
    };

    const updateDataSet = (newData) => {
        dispatch({props: newData});
    };

    const updateDataStructure = (newDataStructure) => {
        dataStructure = updateObject(dataStructure, newDataStructure);
    };

    const inputChangedHandler = (fld, val) => {

        updateField(fld, {
            value: val,
            valid: 0,
            touched: true
        });

    };

    const inputBlurHandler = (fld, val) => {

        updateField(fld, {
            value: val,
            touched: true,
            valid: dataStructure.hasOwnProperty(fld) ? checkValidity(
                val,
                dataStructure[fld].validation,
                dataStructure[fld].onValidation,
                dataSet,
                updateDataSet
            ) : IS_VALID,
        });

    };




    const validateAll = () => {

        let res = true;

        for (let fld in dataSet) {
            if (dataSet.hasOwnProperty(fld)) {

                if (dataSet[fld].valid !== IS_VALID) {
                    const isValid = dataStructure.hasOwnProperty(fld) ? checkValidity(
                        dataSet[fld].value,
                        dataStructure[fld].validation,
                        dataStructure[fld].onValidation,
                        dataSet,
                        updateDataSet
                    ) : IS_VALID;
                    updateField(fld, {
                        valid: isValid
                    });
                    if (isValid !== IS_VALID) res = false;
                }
            }
        }

        return res;

    };

    const prepareFormData = () => {
        let params = new URLSearchParams();
        for (let fld in dataSet) {
            if (dataSet.hasOwnProperty(fld) && dataSet[fld].touched) {
                params.append(fld, dataSet[fld].value);
            }
        }
        return params;
    };

    const loadData = (data) => {
        let updatedData = {};

        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                updatedData[key] = {
                    value: data[key],
                    valid: 1,
                    touched: false
                }
            }
        }

        updateDataSet(updatedData);
    };


    const onSubmitHandler = (e) => {
        e.preventDefault();
        if ((!formIsSubmitting) && validateAll()) {
            setFormIsSubmitting(true);
            formConfig.method(formConfig.action, prepareFormData())
                .then(response => {
                        setFormIsSubmitting(false);
                        setResponse(response);
                    }
                )
                .catch(error => {
                    setFormIsSubmitting(false);
                    setError(error);
                });
        }
    };



    const result = useCallback(() => {
        if (response && response.data.hasOwnProperty('res'))
            return response.data.res;
        else return  null;
    }, [response]);

    const resultSuccess = useCallback(() => {
        return (response && response.data.hasOwnProperty('res') && response.data.res === 1);
    }, [response]);


    const reset = useCallback(() => {
        setError(null);
        setResponse(null);
    }, []);




    return (
        <FormContext.Provider
            value={{
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
                result: result,
                resultSuccess: resultSuccess,
                validateAll: validateAll
            }}
        >
            {props.children}
        </FormContext.Provider>
    );
};

export default FormContextProvider;