import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './style.css'
function MenuItem({to, icon}) {
    return ( 
        <NavLink to={to} className='menuItem'>
            <FontAwesomeIcon icon={icon} className='icon' size='1x' color='#000'/>
        </NavLink>
     );
}
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
}
export default MenuItem;