import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faVideo, faPencil } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import swal from 'sweetalert';
import '../MovieList/movieList.css';
import AlertForm from './component/AlertForm';
const Showtimes = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowtimes, setSelectedShowtimes] = useState(null);

    useEffect(() => {
        const getShowtime = async () => {
            const res = await axios.get('http://localhost:3001/api/v1/admin/showtime-list');
            setShowtimes(res.data.showtimeList);
        };
        getShowtime();
    }, []);

    const handleDelete = async (e, id) => {
        try {
            e.preventDefault();
            const res = await axios.delete(`http://localhost:3001/api/v1/admin/delete-showtime/${id}`);
            setShowtimes((prevUsers) => prevUsers.filter((user) => user._id !== id));
            swal({
                title: 'Deleted successfully',
                icon: 'success',
            });
        } catch (error) {
            console.log('Error in handleDelete func', error);
        }
    };

    const handleEdit = (showtime) => {
        setSelectedShowtimes({
            _id: showtime._id,
            movie_name: showtime.movie_name,
            theater_name: showtime.theater_name,
            room_name: showtime.room_name,
            day: showtime.day,
            time: showtime.time,
            cost: showtime.cost

        });

    };
    useEffect(() => {
        console.log("Showtime:", selectedShowtimes);
    }, [selectedShowtimes]);
    return (
        <div>
            <Table size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tên phim</th>
                        <th>Tên rạp</th>
                        <th>Phòng</th>
                        <th>Ngày chiếu</th>
                        <th>Giờ chiếu</th>
                        <th>Giá vé</th>
                        <th>Sửa</th>
                    </tr>
                </thead>
                <tbody>
                    {showtimes.map((showtime) => {
                        return (
                            <tr key={showtime._id}>
                                <th>
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faVideo}
                                        color="#000"
                                        style={{ alignSelf: 'center' }}
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
                                        {showtime.movie_name}
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
                                        {showtime.theater_name}
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
                                        {showtime.room_name}
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
                                        {showtime.day}
                                    </div>
                                </th>
                                <th>{showtime.time}</th>
                                <th>{showtime.cost}</th>
                                <th>
                                    <button className="button-container">
                                        <FontAwesomeIcon
                                            className="icon-buton"
                                            icon={faTrash}
                                            color="#000"
                                            onClick={(e) => handleDelete(e, showtime._id)}
                                        />
                                    </button>
                                    <button className="button-container" onClick={() => handleEdit(showtime)}>
                                        <FontAwesomeIcon className="icon-buton" icon={faPencil} color="#000" />
                                    </button>
                                    {selectedShowtimes && (
                                        <AlertForm show={true} onHide={() => {handleClose(); setSelectedShowtimes(null)}} showtimeData={selectedShowtimes} />
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
export default Showtimes;
