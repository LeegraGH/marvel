import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';


import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import setContent from '../../utils/setContent';

import '../../style/single.scss';

const SinglePage = ({Component, dataType}) => {
    const {id}=useParams();
    const [data, setData]=useState(null);

    const {clearError, getComic, getCharacter, process, setProcess}=useMarvelService();

    useEffect(()=>{
        updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const updateData=()=>{
        clearError();
        switch (dataType){
            case 'character':
                getCharacter(id)
                .then(onDataLoaded)
                .then(()=>setProcess("confirmed"));
                break;       
            case 'comic':
                getComic(id)
                .then(onDataLoaded)
                .then(()=>setProcess("confirmed"));
                break;
            default:
                break;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    // const content = !(loading||error||!data)?<Component data={data}/>:null;
    // const spinner = loading?<Spinner/>:null;
    // const errorMessage=error?<ErrorMessage/>:null;

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;