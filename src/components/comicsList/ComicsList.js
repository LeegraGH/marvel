import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import { setObjFitImg } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [comics, setComics]=useState([]);
    const [offset, setOfsset]=useState(100);
    const [comicEnded, setComicEnded]=useState(false);
    const {loading, error, getAllComics}=useMarvelService();

    useEffect(()=>{
        updateComics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onComicsLoaded = ({total, newComics}) => {
        const newOffset=offset+8;
        if (newOffset>=total) setComicEnded(true);
        setComics(comics=>[...comics, ...newComics]);
        setOfsset(newOffset);
    }

    const updateComics = () => {
        getAllComics(offset)
        .then(onComicsLoaded);
    }

    const onComicsList = (comics) => {
        const allComics = comics.map((comic, i) => {
            const imgStyle=setObjFitImg(comic.thumbnail);
            return (
                <li className="comics__item" key={i}>
                    <Link to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            <ul className="comics__grid">
                {allComics}
            </ul>
        )
    }

    const onBtnLoad = (offset) => {
        return (
            <button className="button button__main button__long" onClick={()=>updateComics(offset)}>
                <div className="inner">load more</div>
            </button>
        )
    }

    const content = !(comics.length===0||error)?onComicsList(comics):null;
    const spinner = loading?<Spinner/>:null;
    const errorMessage=error?<ErrorMessage/>:null;
    const btnLoad = !(comicEnded||loading)?onBtnLoad(offset):null;

    return (
        <div className="comics__list">
            {errorMessage}
            {content}
            {spinner}
            {btnLoad}
        </div>
    )
}

export default ComicsList;