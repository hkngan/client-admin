import AccountList from "../pages/AccountList/AccountList";
import AddCombo from "../pages/AddCombo/AddCombo";
import AddMovie from "../pages/AddMovie.js/AddMovie";
import AddShowtime from "../pages/AddShowtimes/AddShowtime";
import Homepage from "../pages/Homepage/Homepage";
import MovieList from "../pages/MovieList/MovieList";
import Showtimes from "../pages/Showtimes/Showtimes";

const routes = [
    {
        path: '/',
        page: Homepage,
        layout: null
    },
    {
        path: '/account-list',
        page: AccountList
    },
    {
        path: '/movie-list',
        page: MovieList
    },
    {
        path: '/add-movie',
        page: AddMovie
    },
    {
        path: '/add-showtime',
        page: AddShowtime
    },
    {
        path: '/showtime-list',
        page: Showtimes
    },
    {
        path: '/add-combo',
        page: AddCombo
    }
]
export default routes