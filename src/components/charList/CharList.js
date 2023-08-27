import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import { setObjFitImg } from '../../services/MarvelService';

import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {

    state={
        chars: []
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChars();
    }

    onCharsLoaded=(chars)=>{
        this.setState({chars});
    }

    // onCharsLoaded=(newChars)=>{
    //     this.setState(({chars})=>{
    //         return {chars: [...chars,...newChars]};
    //     });
    // }

    updateChars=()=>{
        this.marvelService.getAllCharacters()
        .then(this.onCharsLoaded);
    }

    render(){
        const {chars}=this.state;

        const charsList=chars.map(char => {
            const {id, ...values}=char;
            return (
                <CharListItem
                key={id}
                {...values}
                />
            )
        });

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {charsList}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                    {/* <div className="inner" onClick={this.updateChars}>load more</div> */}
                </button>
            </div>
        )
    }
}

const CharListItem = ({thumbnail, name}) => {
    const imgStyle = setObjFitImg(thumbnail);

    return (
        <li className="char__item">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharList;