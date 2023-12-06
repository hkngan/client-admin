import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.css'
function MenuItem({to, icon, title}) {
    return ( 
        <NavLink to={to} className='menuItem'>
            <FontAwesomeIcon icon={icon} className='icon' size='1x' color='#000'/>
            <p style={{color: '#000', fontSize: 17, marginLeft: 10}}>{title}</p>
        </NavLink>
     );
}
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
}
export default MenuItem;