import React from 'react';
import FormContextProvider from "./FormContextProvider";

const withFormProvider = (Component, initDataSet, initDataStructure, initFormConfig) => {

    return props => {
        return (
            <FormContextProvider
                initDataSet={initDataSet}
                initDataStructure={initDataStructure}
                initFormConfig={initFormConfig}
            >
                <Component {...props}/>
            </FormContextProvider>
        );
    }

};

export default withFormProvider;
