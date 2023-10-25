import { DETAIL_MOVIE } from "../contants/action-types"
export const detailMovieAction = (idMovie) => {
    return {
        type: DETAIL_MOVIE,
        idMovie
    }
}
