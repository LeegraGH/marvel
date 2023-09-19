import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { setObjFitImg } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { useEffect, useState } from 'react';

const SingleComic = ({id}) => {

    const [comic, setComic]=useState({});

    const {loading, error, getComic}=useMarvelService();

    useEffect(()=>{
        updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const updateComic=()=>{
        getComic(id)
        .then(setComic);
    }

    const onComicLoad=(comic)=>{
        return (
            <>
            <div className="single-comic">
                <img src={comic.thumbnail} alt={comic.title} style={setObjFitImg(comic.thumbnail)} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comic.title}</h2>
                    <p className="single-comic__descr">{comic.description}</p>
                    <p className="single-comic__descr">{comic.pageCount}</p>
                    <p className="single-comic__descr">Language: {comic.language}</p>
                    <div className="single-comic__price">{comic.price}</div>
                </div>
                <Link to="/comics"  className="single-comic__back">Back to all</Link>
            </div>
            </>
        )
    }

    const content = !(loading||error)?onComicLoad(comic):null;
    const spinner = loading?<Spinner/>:null;
    const errorMessage=error?<ErrorMessage/>:null;

    return (
        <>
            {content}
            {spinner}
            {errorMessage}
        </>
    )
}

export default SingleComic;