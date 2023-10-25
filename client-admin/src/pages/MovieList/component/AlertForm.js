import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, FloatingLabel, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import MyButton from '../../AddMovie.js/component/MyButton';
const AlertForm = (props) => {
    const navigate = useNavigate();


    const [img, setImg] = useState('');
    const [id_movie, setIdMovie] = useState('');
    const [movie_name, setName] = useState('');
    const [des, setDes] = useState('');
    const [start_date, setDate] = useState('');
    const [trailer, setTrailer] = useState('');
    const [time, setTime] = useState('');
    const [rates, setRate] = useState([]);
    const [genres, setGenre] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedRate, setSelectedRate] = useState([]);

    useEffect(() => {
        const getGenre = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/v1/admin/genre-list');
                setGenre(res.data.genreList);
            } catch (error) {
                console.log('Error in getGenre func', error);
            }
        };
        const getRate = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/v1/admin/rate-list')
                setRate(res.data.rateList)
            } catch (error) {
                console.log('Error in getGenre func', error);
            }
        }
        getGenre();
        getRate()

    }, []);

    useEffect(() => {
        if (props.movieData) {
            const {
                img,
                id_movie,
                movie_name,
                des,
                start_date,
                trailer,
                time,
                rate,
                genres,
            } = props.movieData;

            setImg(img);
            setIdMovie(id_movie);
            setName(movie_name);
            setDes(des);
            setDate(start_date);
            setTrailer(trailer);
            setTime(time);
            setSelectedRate(rate);
            setSelectedGenres(genres);


        }
    }, [props.movieData]);

    const handleSubmit = async (e ) => {
        e.preventDefault();

        try {
            let id = props.movieData._id
            console.log("id:",id)
            const formData = new FormData();
            formData.append('img', img);
            formData.append('id_movie', id_movie);
            formData.append('movie_name', movie_name);
            formData.append('des', des);
            formData.append('trailer', trailer);
            formData.append('start_date', start_date);
            formData.append('time', time);
            formData.append('rate', selectedRate);
            formData.append('genres', selectedGenres);

            const res = await axios.putForm(`http://localhost:3001/api/v1/admin/update-nowplaying-movie/${id}`, formData);
                swal({
                    title: 'Movie updated!!',
                    icon: 'success',
                });

                navigate('/movie-list')
        } catch (error) {
            console.error('Error in handleSubmit func', error);
            swal({
                title: 'An error occurred while processing your request.',
                icon: 'warning',
                dangerMode: true,
            });
        }
    };
    const handleGenreChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedValues);
    };
    const handleRateChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedRate(selectedValues);
    };
    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };
    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Modal size="lg" {...props} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">THÔNG TIN PHIM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="POSTER">
                                    <Form.Control type="file" onChange={handleImageChange} required />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="MÃ PHIM">
                                    <Form.Control
                                        type="text"
                                        placeholder="Id movie"
                                        value={id_movie}
                                        onChange={(e) => setIdMovie(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="TÊN PHIM">
                                    <Form.Control
                                        type="text"
                                        value={movie_name}
                                        placeholder="TÊN"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="MÔ TẢ">
                                    <Form.Control
                                        type="text"
                                        value={des}
                                        placeholder="MÔ TẢ"
                                        onChange={(e) => setDes(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="NGÀY KHỞI CHIẾU">
                                    <Form.Control
                                        type="date"
                                        value={start_date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="THỜI LƯỢNG">
                                    <Form.Control
                                        type="text"
                                        placeholder="Time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="TRAILER">
                                    <Form.Control
                                        type="text"
                                        placeholder="Trailer"
                                        value={trailer}
                                        onChange={(e) => setTrailer(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="RATE">
                                    <Form.Select value={selectedRate} onChange={handleRateChange}>
                                        <option disabled>
                                            --Chọn rate--
                                        </option>
                                        {rates.length > 0 &&
                                            rates.map((rate) => {
                                                return (
                                                    <option key={rate._id} value={rate.name}>
                                                        {rate.name}
                                                    </option>
                                                );
                                            })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col sm={3} className="my-1">
                                <FloatingLabel label="THỂ LOẠI" style={{ marginLeft: '10px' }}>
                                    <Form.Select value={selectedGenres} onChange={handleGenreChange}>
                                        <option value="" disabled >
                                            --Chọn thể loại--
                                        </option>
                                        {genres.length > 0 &&
                                            genres.map((genre) => {
                                                return (
                                                    <option key={genre._id} value={genre.id}>
                                                        {genre.name}
                                                    </option>
                                                );
                                            })}
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <MyButton onClick={handleSubmit} title={'UPDATE'} />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AlertForm;
