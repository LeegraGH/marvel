import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { setObjFitImg } from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {

    state={
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId!==prevProps.charId) {
            this.updateChar();
        }
    }

    onCharsLoaded=(char)=>{
        this.setState({char:char, loading:false});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateChar=()=>{
        const {charId}=this.props;
        if (!charId) return;
        this.setState({loading: true, error: false});
        this.marvelService.getCharacter(this.props.charId)
        .then(this.onCharsLoaded)
        .catch(this.onError);
    }

    render () {
        const {char, loading, error} = this.state;
        
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
                <div>
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