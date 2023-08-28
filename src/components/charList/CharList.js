import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { setObjFitImg } from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state={
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onCharsLoaded=(chars)=>{
        this.setState({chars:chars, loading:false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateChars=()=>{
        this.setState({loading: true, error: false});
        this.marvelService.getAllCharacters()
        .then(this.onCharsLoaded)
        .catch(this.onError);
    }

    onCharsList = (chars) => {
        const charsList=chars.map(char => {
            const {id, thumbnail, name}=char;
            const imgStyle = setObjFitImg(thumbnail);
            return (
                <li className="char__item" key={id} onClick={()=>this.props.onCharSelect(id)}>
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

    render(){
        const {chars, loading, error} = this.state;
        const charList=this.onCharsList(chars);

        const errorMessage= error ? <ErrorMessage/>:null;
        const spinner = loading ? <Spinner/> : null;
        const content=!(loading||error)?(charList):null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;