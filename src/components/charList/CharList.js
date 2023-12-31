import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import { setObjFitImg } from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import setContent from '../../utils/setContent';

import './charList.scss';

const setContent = (process, Component, Button, data) => {
    switch (process){
        case "waiting":
            return <Spinner/>;
        case "loading":
            return data.length!==0 ? 
            (<>
            <Component/>
            <Spinner/>
            </>)
            :<Spinner/>;
        case "confirmed":
            return (<>
                    <Component/>
                    <Button/>
                    </>);
        case "error":
            return <ErrorMessage/>;
        default:
            throw new Error("Unexpected process state");
    }
}

const CharList = (props) => {

    const [chars, setChars]=useState([]);
    const [offset, setOffset]=useState(0);
    const [charEnded, setEnded]=useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(()=>{
        updateChars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCharsLoaded=({total, newChars})=>{
        const newOffset=offset+9;
        if (newOffset>=total) setEnded(true);
        setChars(chars=>[...chars, ...newChars]);
        setOffset(newOffset);
    }

    const updateChars=()=>{
        getAllCharacters(offset)
        .then(onCharsLoaded)
        .then(()=>setProcess("confirmed"));
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
            <>
                <ul className="char__grid">
                    {charsList}
                </ul>
            </>
        )
    }

    const onBtnLoad = (offset) => {
        return (
            <button style={charEnded?{display:"none"}:{display:"block"}} className="button button__main button__long" onClick={()=>updateChars(offset)}>
                <div className="inner">load more</div>
            </button>
        )
    }

    // const charList=onCharsList(chars);

    // const errorMessage= error ? <ErrorMessage/>:null;
    // const spinner = loading ? <Spinner/> : null;
    // const content=!(error||charList.length===0)?(charList):null;
    // const btnLoad=!(loading||charEnded) ? onBtnLoad(offset): null;

    const elements = useMemo(()=>{
        return setContent(process, ()=>onCharsList(chars), ()=>onBtnLoad(offset), chars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [process]);

    return (
        <div className="char__list">
            {elements}
        </div>
    )
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;