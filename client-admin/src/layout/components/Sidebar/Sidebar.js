import Menu, {MenuItem} from './Menu';
import config from '../../../config'
import {faUser, faFilm, faAdd, faCirclePlus, faRightFromBracket, faCalendar, faMugHot} from '@fortawesome/free-solid-svg-icons'
import './sidebar.style.css'
function Sidebar() {
    return ( 
        <aside className='wrapperSidebar'>
            <Menu>
                <MenuItem to={config.routes.user_list} icon={faUser}  title='User'/>
                <MenuItem to={config.routes.movie_list} icon={faFilm} title='Movie'/>
                <MenuItem to={config.routes.showtimes} icon={faCalendar} title='Showtime'/>
                <MenuItem to={config.routes.add_movie} icon={faCirclePlus} title='Add movie'/>
                <MenuItem to={config.routes.add_showtimes} icon={faAdd} title='Add showtime'/>
                <MenuItem to={config.routes.add_combo} icon={faMugHot} title='Add combo'/>
                <MenuItem icon={faRightFromBracket} title='Log out'/>
            </Menu>
        </aside>
     );
}

export default Sidebar;