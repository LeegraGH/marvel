import spinner from './spinner.gif';

import './spinner.scss';

const Spinner = () => {
    return (
        <div>
            <img src={spinner} alt="spinner" className="spinner"/>
        </div>
    )
};

export default Spinner;