import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchCharForm from "../searchCharForm/SearchCharForm";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setSelectedChar]=useState(null);

    function onCharSelect(id){
        setSelectedChar(id);
    }

    return (
        <>
        <Helmet>
            <meta
                name="description"
                content="Marvel portal"
                />
            <title>Marvel Portal</title>
        </Helmet>
        <ErrorBoundary>
            <RandomChar/>
        </ErrorBoundary>
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelect={onCharSelect}/>
            </ErrorBoundary>
            <div className="char__block">
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <SearchCharForm/>
                </ErrorBoundary>
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;