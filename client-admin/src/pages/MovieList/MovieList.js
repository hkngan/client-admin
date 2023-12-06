import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faVideo, faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import './movieList.css';
import AlertForm from './component/AlertForm';
const MovieList = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [nowplayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const getMovieList = async () => {
            const res = await axios.get('http://localhost:3001/api/v1/admin/nowplaying-movie-list');
            setNowPlayingMovies(res.data.movieList);
        };
        getMovieList();
    }, []);

    const handleDelete = async (e, id) => {
        try {
            e.preventDefault();
            const res = await axios.delete(`http://localhost:3001/api/v1/admin/delete-nowplaying-movie/${id}`);
            setNowPlayingMovies((prevUsers) => prevUsers.filter((user) => user._id !== id));
            swal({
                title: 'Deleted successfully',
                icon: 'success',
            });
        } catch (error) {
            console.log('Error in handleDelete func', error);
        }
    };

    const handleEdit = (nowplaying) => {
        setSelectedMovie({
            _id: nowplaying._id,
            img: nowplaying.img,
            id_movie: nowplaying.id_movie,
            movie_name: nowplaying.movie_name,
            des: nowplaying.des,
            trailer: nowplaying.trailer,
            start_date: nowplaying.start_date,
            time: nowplaying.time,
            rate: nowplaying.rate,
            genres: nowplaying.genres

        });

    };
    // useEffect(() => {
    //    console.log("Movie", selectedMovie);
    // }, [selectedMovie]);
    return (
        <div>
            <h2 style={{marginTop: 10, textAlign: 'center'}}>Movie List</h2>
            <Table size="sm" responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Tên phim</th>
                        <th>Poster</th>
                        <th>Mô tả</th>
                        <th>Trailer</th>
                        <th style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>Thể loại</th>
                        <th style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>Thời lượng</th>
                        <th style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>Khởi chiếu</th>
                        <th>Rate</th>
                        <th style={{
                                    textAlign: 'center'}}>Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {nowplayingMovies.map((nowplaying) => {
                        return (
                            <tr key={nowplaying._id}>
                                <th>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faVideo}
                                        color="#000"
                                        style={{ alignSelf: 'center' }}
                                    />
                                </th>
                                <th>{nowplaying.id_movie}</th>
                                <th>
                                    <div
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {nowplaying.movie_name}
                                    </div>
                                </th>
                                <th>
                                    <img
                                        src={`http://localhost:3001/${nowplaying.img}`}
                                        alt="poster"
                                        style={{
                                            width: '60px',
                                            height: '100px',
                                        }}
                                    />
                                </th>
                                <th>
                                    <div
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {nowplaying.des}
                                    </div>
                                </th>
                                <th>
                                    <div
                                        style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {nowplaying.trailer}
                                    </div>
                                </th>
                                <div
                                     style={{
                                            width: '90px'
                                        }}    
                                >
                                    <th>{nowplaying.genres}</th>
                                </div>
                                <th >{nowplaying.time}</th>
                                <th style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>{nowplaying.start_date}</th>
                                <th>
                                    <div
                                        style={{
                                            width: '200px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {nowplaying.rate}
                                    </div>
                                </th>
                                <th style={{
                                            width: '150px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}>
                                    <button className="button-container">
                                        <FontAwesomeIcon
                                            className="icon-buton"
                                            icon={faTrash}
                                            color="#000"
                                            onClick={(e) => handleDelete(e, nowplaying._id)}
                                        />
                                    </button>
                                    <button className="button-container" onClick={() => handleEdit(nowplaying)}>
                                        <FontAwesomeIcon className="icon-buton" icon={faPencil} color="#000" />
                                    </button>
                                    {selectedMovie && (
                                        <AlertForm show={true} onHide={() => {handleClose(); setSelectedMovie(null)}} movieData={selectedMovie} />
                                    )}
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
export default MovieList;
