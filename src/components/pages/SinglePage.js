import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import '../../style/single.scss';

const SinglePage = ({Component, dataType}) => {
    const {id}=useParams();
    const [data, setData]=useState(null);

    const {loading, error, clearError, getComic, getCharacter}=useMarvelService();

    useEffect(()=>{
        updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const updateData=()=>{
        clearError();
        switch (dataType){
            case 'character':
                getCharacter(id)
                .then(onDataLoaded);
                break;       
            case 'comic':
                getComic(id)
                .then(onDataLoaded);
                break;
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const content = !(loading||error||!data)?<Component data={data}/>:null;
    const spinner = loading?<Spinner/>:null;
    const errorMessage=error?<ErrorMessage/>:null;

    return (
        <>
            <AppBanner/>
            {content}
            {spinner}
            {errorMessage}
        </>
    )
}

export default SinglePage;