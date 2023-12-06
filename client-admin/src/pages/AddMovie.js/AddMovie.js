import React, { useEffect, useState } from 'react';
import './add_movie_module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import MyButton from './component/MyButton';
const AddMovie = () => {
    const typeMovie = [
        {
            id: 1,
            name: 'PHIM ĐANG CHIẾU',
            value: 'nowplaying',
        },
        {
            id: 2,
            name: 'PHIM SẮP CHIẾU',
            value: 'upcoming',
        },
    ];
    const [img, setImg] = useState('');
    const [id_movie, setIdMovie] = useState('');
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [start_date, setDate] = useState('');
    const [trailer, setTrailer] = useState('');
    const [time, setTime] = useState('');
    const [rates, setRate] = useState([]);
    const [genres, setGenre] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedType, setSelectedType] = useState([]);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (
                img === '' ||
                id_movie === '' ||
                name === '' ||
                des === '' ||
                start_date === '' ||
                trailer === '' ||
                time === '' ||
                selectedGenres === '' ||
                selectedRate === ''
            ) {
                swal({
                    title: 'Please enter all fields',
                    icon: 'warning',
                    dangerMode: true,
                });
                return;
            }

            const formData = new FormData();
            formData.append('img', img);
            formData.append('id_movie', id_movie);
            formData.append('movie_name', name);
            formData.append('des', des);
            formData.append('trailer', trailer);
            formData.append('start_date', start_date);
            formData.append('time', time);
            formData.append('rate', selectedRate);
            formData.append('genres', selectedGenres);
            let res;
            if (selectedType.includes('nowplaying')) {
                res = await axios.post('http://localhost:3001/api/v1/admin/add-nowplaying-movie', formData);
            } else {
                res = await axios.post('http://localhost:3001/api/v1/admin/add-upcoming-movie', formData);
            }

                swal({
                    title: 'Movie added!!',
                    icon: 'success',
                });
                setSelectedType([])
                setIdMovie('');
                setName('');
                setDes('');
                setDate('');
                setTrailer('');
                setTime('');
                setSelectedRate([]);
                setSelectedGenres([]);
            } catch (error) {
            console.error('Error in handleSubmit func', error);
            swal({
                title: 'An error occurred while processing your request.',
                icon: 'warning',
                dangerMode: true,
            });
        }
    };

    // console.log(id_movie, name, img, start_date, time, selectedRate, trailer,selectedGenres, selectedType)

    const handleGenreChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedGenres(selectedValues);
    };

    const handleRateChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedRate(selectedValues);
    };

    const handleTypeChange = (e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedType(selectedValues);
    };
    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };
    return (
    <div>
        <h2 style={{marginTop: 10, textAlign: 'center'}}>Add Movie</h2>
        <Form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                <Col sm={3} className="my-1" style={{marginLeft: '10px'}}>
                    <FloatingLabel label="PHIM">
                        <Form.Select onChange={handleTypeChange}>
                            <option value="" disabled selected>--Phim--</option>
                            {typeMovie.length > 0 &&
                                typeMovie.map((type) => {
                                    return (
                                        <option key={type.id} value={type.value}>
                                            {type.name}
                                        </option>
                                    );
                                })}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
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
                            value={name}                            
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
                            placeholder="Select date"
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
                    <FloatingLabel label="RATE" style={{marginLeft: '10px'}}>
                       <Form.Select onChange={handleRateChange}>
                            <option disabled selected>--Chọn rate--</option>
                            {rates.length > 0 && rates.map((rate) => {
                                return (
                                    <option key={rate._id} value={rate.name}>{rate.name}</option>
                                )
                            })}
                       </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col sm={3} className="my-1">
                    <FloatingLabel label="THỂ LOẠI" style={{marginLeft: '10px'}}>
                        <Form.Select onChange={handleGenreChange }>
                            <option value="" disabled selected>--Chọn thể loại--</option>
                            {genres.length > 0 && genres.map((genre) => {
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
                    <MyButton onClick={handleSubmit} title={'Add'} />
                </Col>
            </Row>
        </Form>
    </div>
    );
};
export default AddMovie;
