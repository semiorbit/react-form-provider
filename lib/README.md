# Semiorbit Form Provider

### Usage

1- Create DataSet object where data will be stored:

```javascript
export const myDataSet = {
    first_name: {value: "", valid: 0, touched: false},
    last_name: {value: "", valid: 0, touched: false},
    job_title: {value: "", valid: 0, touched: false},
    email: {value: "", valid: 0, touched: false},
};
```

2- Describe DataSet in a Structure object as follows:

```javascript
export const myDataSetStructure = {
    first_name: {
        validation: {
            required: true,
        }
    },
    last_name: {
        validation: {
            required: true,
        }
    },
    email: {
        validation: {
            required: true,
            isEmail: true
        }
    },
};
```


3- Create react "container", and use context provider to link form:

```javascript
function MyEditFromContainer() {

    const formCtx = useContext(FormContext);


    return (
        <Layout>
            <MyEditForm
                {...linkDataSet(formCtx)}
            />
        </Layout>
    );

}

export default withFormProvider(
    MyEditFromContainer,
    myDataSet,
    myDataSetStructure,
    {
        action: '/link/to/save/'
    }
);
```

4- Finally, create form view:

```javascript
const MyEditForm = props => {

    return (
     
            <form onSubmit={props.submitHandler}>

                <TextField
                    {...dsField("first_name", props)}
                />

                <TextField
                    {...dsField("last_name", props)}
                />

                <TextField
                    {...dsField("job_title", props)}
                />

                <TextField
                    {...dsField("email", props)}
                />


                <Button type={"submit"} disabled={!(props.formIsValid)}>
                    Save
                </Button>
                
            </form>

    );

};

export default PersonalInformationForm;

```

## Package Reference

```javascript

export const FormContext = React.createContext({
    dataSet: {},
    dataStructure: {},
    formConfig: {},
    formIsValid: false,
    formIsSubmitting: false,
    response: null,
    error: null,
    loadData: (data) => {},
    loadDataFrom: (url, params) => {},
    updateDataSet: (newData) => {},
    updateDataStructure: (newDataStructure) => {},
    inputChangedHandler: (fld, val) => {},
    inputBlurHandler: (fld, val) => {},
    updateField: (fld, updatedProperties) => {},
    onSubmitHandler: (e) => {},
    reset: () => {},
    validateAll: () => {}
});


```

```javascript
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
```