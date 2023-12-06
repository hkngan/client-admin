import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button, FloatingLabel, Table } from 'react-bootstrap';
import swal from 'sweetalert';
import axios from 'axios';
const AddShowtime = () => {
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
  // const handleSubmit = async (e) =>{
  //   e.preventDefault()
  //   try {
  //     if(
  //       selectedMovie === ''|| day === '' ||
  //       selectedTheater === '' || time === ''
  //       || selectedPrice === '' || selectedRoom === ''
  //     ){
  //       swal({
  //         title: 'Please enter all fields',
  //         icon: 'warning',
  //         dangerMode: true
  //       })
  //       return
  //     }
  //     const formData = new FormData()
  //     // formData.append('movie_name', selectedMovie)
  //     // formData.append('theater_name', selectedTheater)
  //     // formData.append('room_name', selectedRoom)
  //     // formData.append('day', day)
  //     // formData.append('time', time)
  //     // formData.append('cost', selectedPrice)

  //     formData.append('movie_name', selectedMovie);
  //     formData.append('theater_name', selectedTheater);
  //     formData.append('room_name', selectedRoom);
  //     formData.append('day', day);
  //     formData.append('time', time);
  //     formData.append('cost', selectedPrice);
  //     const res = await axios.post('http://localhost:3001/api/v1/admin/add-showtime', formData)
  //     console.log('Form Data:', formData.get('movie_name'),  formData.get('theater_name'), formData.get('room_name'),
  //     formData.get('day'), formData.get('time'), formData.get('cost'),);

  //     swal({
  //       title: 'Movie added!!',
  //       icon: 'success',
  //   });

  //     setSelectedMovie([])
  //     setSelectedTheater([])
  //     setDay('')
  //     setTime('')
  //     setSelectedRoom([])
  //     setSelectedPrice([])
  //   } catch (error) {
  //     console.log("Error in handleSubmit", error)
  //     swal({
  //       title: 'An error occurred while processing your request.',
  //       icon: 'warning',
  //       dangerMode: true
  //     })
  //   }
  // }

  // console.log(selectedMovie, selectedPrice, selectedRoom, selectedTheater, day, time)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        selectedMovie === '' ||
        day === '' ||
        selectedTheater === '' ||
        time === '' ||
        selectedPrice === '' ||
        selectedRoom === ''
      ) {
        swal({
          title: 'Please enter all fields',
          icon: 'warning',
          dangerMode: true,
        });
        return;
      }

      const data = {
        movie_name: selectedMovie,
        theater_name: selectedTheater,
        room_name: selectedRoom,
        day: day,
        time: time,
        cost: selectedPrice,
      };

      const res = await axios.post(
        'http://localhost:3001/api/v1/admin/add-showtime',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response:', res.data);

      swal({
        title: 'Showtime added!!',
        icon: 'success',
      });

      setSelectedMovie(null);
      setSelectedTheater(null);
      setDay('');
      setTime('');
      setSelectedRoom(null);
      setSelectedPrice(null);
    } catch (error) {
      console.log('Error in handleSubmit', error);
      swal({
        title: 'An error occurred while processing your request.',
        icon: 'warning',
        dangerMode: true,
      });
    }
  };

  return (
    <div>
      <h2 style={{marginTop: 10, textAlign: 'center'}}>Add Showtime</h2>
      <Form onSubmit={handleSubmit}>
          <Row className="align-items-center">
              <Col sm={3} className="my-1">
                  <FloatingLabel label="PHIM">
                      <Form.Select onChange={handleMovieChange} aria-label="PHIM">
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
                      <Form.Select onChange={handleTheaterChange} aria-label="RẠP">
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
                      <Form.Select onChange={handleRoomChange}>
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
                      <Form.Select onChange={handlePriceChange}>
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
                  <Button as={Col} variant="danger" className="button-add" type="submit" onClick={handleSubmit}>
                      Add
                  </Button>
              </Col>
          </Row>
      </Form>
    </div>
  );
}

export default AddShowtime