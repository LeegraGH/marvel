import { Link } from 'react-router-dom';

import { setObjFitImg } from '../../services/MarvelService';

import '../../style/single.scss';

const SingleComic = ({data}) => {
    return (
        <>
        <div className="single">
            <img src={data.thumbnail} alt={data.title} style={setObjFitImg(data.thumbnail)} className="single__img"/>
            <div className="single__info">
                <h2 className="single__name">{data.title}</h2>
                <p className="single__descr">{data.description}</p>
                <p className="single__descr">{data.pageCount}</p>
                <p className="single__descr">Language: {data.language}</p>
                <div className="single__price">{data.price}</div>
            </div>
            <Link to="/comics"  className="single__back">Back to all</Link>
        </div>
        </>
    )
}

export default SingleComic;