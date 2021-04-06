import {errMsg} from "./validation";

export const dsField = (fld, ctx) => {
    return {
        value: ctx.ds[fld].value,
        onChange: (e) => ctx.inputChangedHandler(fld, e.target.value),
        onBlur: (e) => ctx.inputBlurHandler(fld, e.target.value),
        error: (ctx.ds[fld].valid > 1),
        helperText: errMsg(ctx.ds[fld].valid),
        label: ctx.dsStructure[fld].label
    };
};

export const linkDataSet = (formCtx) => {
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

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const firstElementOf = (obj) => {
    return obj[Object.keys(obj)[0]];
};