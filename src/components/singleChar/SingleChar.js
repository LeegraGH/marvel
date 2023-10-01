import { setObjFitImg } from '../../services/MarvelService';

import '../../style/single.scss';

const SingleChar = ({data}) => {
    return (
        <>
        <div className="single">
            <img src={data.thumbnail} alt={data.name} style={setObjFitImg(data.thumbnail)} className="single__img"/>
            <div className="single__info">
                <h2 className="single__name">{data.name}</h2>
                <p className="single__descr">{data.description}</p>
            </div>
        </div>
        </>
    )
}

export default SingleChar;