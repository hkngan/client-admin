import Menu, {MenuItem} from './Menu';
import config from '../../../config'
import {faUser, faFilm, faAdd, faCirclePlus, faRightFromBracket, faCalendar, faMugHot} from '@fortawesome/free-solid-svg-icons'
import './sidebar.style.css'
function Sidebar() {
    return ( 
        <aside className='wrapperSidebar'>
            <Menu>
                <MenuItem to={config.routes.user_list} icon={faUser} />
                <MenuItem to={config.routes.movie_list} icon={faFilm} />
                <MenuItem to={config.routes.showtimes} icon={faCalendar}/>
                <MenuItem to={config.routes.add_movie} icon={faCirclePlus}/>
                <MenuItem to={config.routes.add_showtimes} icon={faAdd}/>
                <MenuItem to={config.routes.add_combo} icon={faMugHot}/>
                <MenuItem icon={faRightFromBracket} />
            </Menu>
        </aside>
     );
}

export default Sidebar;