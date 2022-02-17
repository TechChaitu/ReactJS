import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom';

const Header = ({title,onAdd,showAdd}) => {
    const location=useLocation();
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname ==='/' && <Button color={showAdd?'blue':'Red'} onAdd={onAdd} text={showAdd?'close':'Add'}/>}
        </header>
    );
}

Header.defaultProps={
    title:"Task Tracker"
}
Header.propTypes={
    title:PropTypes.string.isRequired
}

//const Headerstyles={color:'Green',backgroundColor:'black'};

export default Header;