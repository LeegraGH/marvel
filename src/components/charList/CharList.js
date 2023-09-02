import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { setObjFitImg } from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    
    state={
        chars: [],
        loading: true,
        error: false,
        offset: 0,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onCharsLoaded=({total, newChars})=>{
        let end=false;
        const offset=this.state.offset+9;
        if (offset>=total) end=true;
        this.setState(({chars})=>{
            return {
                chars: [...chars, ...newChars],
                loading: false,
                offset: offset,
                charEnded: end
            }
        });
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateChars=()=>{
        this.setState({loading: true, error: false});
        this.marvelService.getAllCharacters(this.state.offset)
        .then(this.onCharsLoaded)
        .catch(this.onError);
    }

    charRefs=[];

    setRef=(ref)=>{
        this.charRefs.push(ref);
    }

    focusChar=(id)=>{
        this.charRefs.forEach(char=>char.classList.remove('char__item_selected'));
        this.charRefs[id].classList.add('char__item_selected');
        // this.charRefs[id].focus();
    }

    onCharsList = (chars) => {
        const charsList=chars.map((char, i) => {
            const {id, thumbnail, name}=char;
            const imgStyle = setObjFitImg(thumbnail);
            return (
                <li 
                className="char__item" 
                key={id}
                ref={this.setRef}
                onClick={()=>{
                    this.props.onCharSelect(id);
                    this.focusChar(i); 
                }}
                onKeyUp={(e)=>{
                    if (e.key==="Enter")
                    {
                        this.props.onCharSelect(id);
                        this.focusChar(i);
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

    onBtnLoad = (offset) => {
        return (
            <button className="button button__main button__long" onClick={()=>this.updateChars(offset)}>
                <div className="inner">load more</div>
            </button>
        )
    }

    render(){
        const {chars, loading, error, offset, charEnded} = this.state;
        const charList=this.onCharsList(chars);

        const errorMessage= error ? <ErrorMessage/>:null;
        const spinner = loading ? <Spinner/> : null;
        const content=!(error||charList.length===0)?(charList):null;
        const btnLoad=!(loading||charEnded) ? this.onBtnLoad(offset): null;

        return (
            <div className="char__list">
                {errorMessage}
                {content}
                {spinner}
                {btnLoad}
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelect: PropTypes.func.isRequired
}

export default CharList;