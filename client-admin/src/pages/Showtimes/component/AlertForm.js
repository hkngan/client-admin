import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, FloatingLabel, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import MyButton from '../../AddMovie.js/component/MyButton';

const AlertForm = (props) => {
    const navigate = useNavigate();
    const [day, setDay] = useState('')
    const [time, setTime] = useState('')
    const [movies, setMovie] = useState([])
    const [theaters, setTheater] = useState([])
    const [rooms, setRoom] = useState([])
    const [prices, setPrice] = useState([])
    const [selectedMovie, setSelectedMovie] = useState([])
    const [selectedTheater, setSelectedTheater] = useState([])
    const [selectedRoom, setSelectedRoom] = useState([])
    const [selectedPrice, setSelectedPrice] = useState([])
  
    useEffect(() => {
      const getMovie = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/v1/admin/nowplaying-movie-list')
          setMovie(res.data.movieList)
        } catch (error) {
          console.log("Error getMovie func", error)
        }
      }
    
      const getTheater = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/v1/admin/theater-list')
          setTheater(res.data.theaterList)
        } catch (error) {
          console.log("Error in getTheater func", error)
        }
      }
    
      const getRoom = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/v1/admin/room-list')
          setRoom(res.data.roomList)
        } catch (error) {
          console.log("Error in getRoom func", error)
        }
      }
    
      const getPrice = async () => {
        try {
          const res = await axios.get('http://localhost:3001/api/v1/admin/price-list')
          setPrice(res.data.priceList)
        } catch (error) {
          console.log("Error in getPrice func", error)
        }
      }
      getMovie()
      getTheater()
      getRoom()
      getPrice()
    }, [])
    const handleMovieChange = (e) => {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
      setSelectedMovie(selectedValues)
    }
  
    const handleTheaterChange = (e) => {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
      setSelectedTheater(selectedValues)
    }
  
    const handleRoomChange = (e) => {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
      setSelectedRoom(selectedValues)
    }
    
    const handlePriceChange = (e) => {
      const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
      setSelectedPrice(selectedValues)
    }
    useEffect(() => {
        if (props.showtimeData) {
            const {
                movie_name,
                theater_name,
                room_name,
                day,
                time,
                cost,
            } = props.showtimeData;

            setSelectedMovie(movie_name);
            setSelectedTheater(theater_name);
            setSelectedRoom(room_name);
            setDay(day);
            setTime(time);
            setSelectedPrice(cost);
            
        }
    }, [props.showtimeData]);
    const handleUpdate = async (e) => {
        e.preventDefault();
      
        try {
          let id = props.showtimeData._id;
      
          const data = {
            theater_name: selectedTheater,
            room_name: selectedRoom,
            day,
            time,
            cost: selectedPrice,
          };
      
          console.log('Data to be sent:', data);
      
          const res = await axios.put(
            `http://localhost:3001/api/v1/admin/update-showtime/${id}`,
            data,
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
      
          console.log('Updated Data:', res.data);
      
          swal({
            title: 'Showtime updated!!',
            icon: 'success',
          });
      
        } catch (error) {
          console.error('Error in handleUpdate func', error);
          swal({
            title: 'An error occurred while processing your request.',
            icon: 'warning',
            dangerMode: true,
          });
        }
      };
      
    return (
        <div
            style={{
                flex: 1,
            }}
        >
            <Modal size="lg" {...props} animation={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">THÔNG TIN SUẤT CHIẾU</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleUpdate}>
          <Row className="align-items-center">
              <Col sm={3} className="my-1">
                  <FloatingLabel label="PHIM">
                      <Form.Select value={selectedMovie} onChange={handleMovieChange} aria-label="PHIM" disabled>
                          <option value="" disabled selected>
                              --Chọn phim--
                          </option>
                          {movies.length > 0 &&
                              movies.map((movie) => {
                                  return (
                                      <option key={movie._id} value={movie.id}>
                                          {movie.movie_name}
                                      </option>
                                  );
                              })}
                      </Form.Select>
                  </FloatingLabel>
              </Col>
              <Col sm={3} className="my-1">
                  <FloatingLabel label="CHỌN NGÀY CHIẾU">
                      <Form.Control
                          type="date"
                          placeholder="Select date"
                          value={day}
                          onChange={(e) => setDay(e.target.value)}
                          required
                      />
                  </FloatingLabel>
              </Col>
          </Row>
          <Row className="align-items-center">
              <Col sm={3} className="my-1">
                  <FloatingLabel label="RẠP">
                      <Form.Select value={selectedTheater} onChange={handleTheaterChange} aria-label="RẠP">
                          <option value="" disabled selected>
                              --Chọn rạp--
                          </option>
                          {theaters.length > 0 &&
                              theaters.map((theater) => {
                                  return (
                                      <option key={theater._id} value={theater.theater_name}>
                                          {theater.theater_name}
                                      </option>
                                  );
                              })}
                      </Form.Select>
                  </FloatingLabel>
              </Col>
              <Col sm={3} className="my-1">
                  <FloatingLabel label="GIỜ CHIẾU">
                      <Form.Control value={time} onChange={(e) => setTime(e.target.value)} />
                  </FloatingLabel>
              </Col>
          </Row>
          <Row className="align-items-center">
              <Col sm={3} className="my-1">
                  <FloatingLabel label="PHÒNG CHIẾU" aria-label="PHÒNG">
                      <Form.Select value={selectedRoom} onChange={handleRoomChange}>
                          <option value="" disabled selected>
                              --Chọn phòng chiếu--
                          </option>
                          {rooms.length > 0 &&
                              rooms.map((room) => {
                                  return (
                                      <option key={room._id} value={room.room_name}>
                                          {room.room_name}
                                      </option>
                                  );
                              })}
                      </Form.Select>
                  </FloatingLabel>
              </Col>
              <Col sm={3} className="my-1">
                  <FloatingLabel label="GIÁ VÉ" aria-label="VÉ" style={{ marginLeft: '10px' }}>
                      <Form.Select value={selectedPrice} onChange={handlePriceChange}>
                          <option value="" disabled selected>
                              --Chọn giá vé--
                          </option>
                          {prices.length > 0 &&
                              prices.map((price) => {
                                  return (
                                      <option key={price._id} value={price.cost}>
                                          {price.cost} vnd
                                      </option>
                                  );
                              })}
                      </Form.Select>
                  </FloatingLabel>
              </Col>
          </Row>
          <Row className="align-items-center">
              <Col sm={3} className="my-1">
                <MyButton onClick={handleUpdate} title={'UPDATE'} />
              </Col>
          </Row>
      </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AlertForm;
