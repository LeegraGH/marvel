import { Formik, Field, Form, ErrorMessage as ErrorMessageFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from '../errorMessage/ErrorMessage';

import "./searchCharForm.scss";

const setContent = (process, Component, data) => {
    switch (process){
        case "waiting":
        case "loading":
            return null;
        case "confirmed":
            return <Component data={data}/>;
        case "error":
            return <ErrorMessage/>;
        default:
            throw new Error("Unexpected process state");
    }
}  

const SearchCharForm = () => {
    
    const [char, setChar]=useState({});

    const {getCharacterByName, clearError, process, setProcess} = useMarvelService();
    
    const onLoadChar = (char) => {
        setChar(char);
    }

    const updateChar=(name) => {
        clearError();
        getCharacterByName(name)
        .then(onLoadChar)
        .then(()=>setProcess("confirmed"));
    }

    const existChar = (data) => {
        if (data!=null) {
            if (Object.keys(data).length>0){
                return (
                    <div className="char__exist_content">
                        <div className="char__visit">There is! Visit {data.name} page?</div>
                        <Link to={`/characters/${data.id}`} className="button button__secondary">
                            <div className="inner">to page</div>
                        </Link>
                    </div>
                )
            } return null;
        }
        return <div className="char__error">The character was not found. Check the name and try again!</div>;
    }

    // const errorMessage=error?<ErrorMessage/>:null;
    // const content = !(loading||error)?existChar(char):null;

    return (
        <div className="char__search">
            <Formik
            initialValues={{name: ""}}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required")
            })}
            onSubmit={values => updateChar(values.name)}
            >
                <Form className="char__form">
                    <label className="char__label" htmlFor="name">Or find a character by name:</label>
                    <div className="char__field">
                        <Field className="char__input" type="text" id="name" name="name" placeholder="Enter name"/>
                        <button className="button button__main" type="submit"><div className="inner">find</div></button>
                    </div>
                    <ErrorMessageFormik className="char__error" name="name" component="div"/>
                </Form>
            </Formik>
            {setContent(process, ()=>existChar(char), char)}
        </div>
    )
}

export default SearchCharForm;