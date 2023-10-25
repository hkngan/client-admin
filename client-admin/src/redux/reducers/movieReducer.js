import { DETAIL_MOVIE } from "../contants/action-types"
const initialState = {
    movie: {
        id_movie: '',
        name: '',
        img: '',
        des: '',
        trailer: '',
        start_date: '',
        time: '',
        rating: '',
        genres: ''
    }
}
export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_MOVIE: {
            state.edit = action.values
            return {...state}
        }
        default:
    }
    return {...state}
}