import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import { setObjFitImg } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar]=useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(()=>{
        updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.charId]);

    const updateChar=()=>{
        if (!props.charId) return;
        clearError();
        getCharacter(props.charId, false)
        .then(setChar);
    }
    
    const skeleton = !(loading||error||char)?<Skeleton/>:null;
    const errorMessage= error ? <ErrorMessage/>:null;
    const spinner = loading ? <Spinner/> : null;
    const content=!(loading||error||!char)?<View char={char}/>:null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics}=char;
    const styleImg=setObjFitImg(thumbnail);

    const comicsList=comics.slice(0,10).map((comic, i)=>{
        return (
            <li className="char__comics-item" key={i}>
                {comic.name}
            </li>
        )
    });

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg}/>
                <div className='char__info-descr'>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsList.length > 0 ? comicsList : "No information"}
            </ul>
        </>
    )
}

CharInfo.propTypes={
    charId: PropTypes.number
}

export default CharInfo;