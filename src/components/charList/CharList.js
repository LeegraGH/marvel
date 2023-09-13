import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { setObjFitImg } from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]=useState(false);
    const [offset, setOffset]=useState(0);
    const [charEnded, setEnded]=useState(false);

    const marvelService = new MarvelService();

    useEffect(()=>{
        updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCharsLoaded=({total, newChars})=>{
        let end=false;
        const newOffset=offset+9;
        if (newOffset>=total) end=true;
        setChars(chars=>[...chars, ...newChars]);
        setLoading(false);
        setOffset(newOffset);
        setEnded(end);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChars=()=>{
        setLoading(true);
        setError(false);
        marvelService.getAllCharacters(offset)
        .then(onCharsLoaded)
        .catch(onError);
    }

    const charRefs=useRef([]);

    const focusChar=(id)=>{
        charRefs.current.forEach(char=>char.classList.remove('char__item_selected'));
        charRefs.current[id].classList.add('char__item_selected');
        // this.charRefs[id].focus();
    }

    const onCharsList = (chars) => {
        const charsList=chars.map((char, i) => {
            const {id, thumbnail, name}=char;
            const imgStyle = setObjFitImg(thumbnail);
            return (
                <li 
                className="char__item" 
                key={id}
                ref={el=>charRefs.current[i]=el}
                onClick={()=>{
                    props.onCharSelect(id);
                    focusChar(i); 
                }}
                onKeyUp={(e)=>{
                    if (e.key==="Enter")
                    {
                        props.onCharSelect(id);
                        focusChar(i);
                    } 
                }}
                tabIndex={1}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    
        return (
            <ul className="char__grid">
                {charsList}
            </ul>
        )
    }

    const onBtnLoad = (offset) => {
        return (
            <button className="button button__main button__long" onClick={()=>updateChars(offset)}>
                <div className="inner">load more</div>
            </button>
        )
    }

    const charList=onCharsList(chars);

    const errorMessage= error ? <ErrorMessage/>:null;
    const spinner = loading ? <Spinner/> : null;
    const content=!(error||charList.length===0)?(charList):null;
    const btnLoad=!(loading||charEnded) ? onBtnLoad(offset): null;

    return (
        <div className="char__list">
            {errorMessage}
            {content}
            {spinner}
            {btnLoad}
        </div>
    )
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;