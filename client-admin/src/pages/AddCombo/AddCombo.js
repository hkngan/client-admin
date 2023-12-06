import React, { useState } from 'react'
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap';
import MyButton from '../AddMovie.js/component/MyButton';
import swal from 'sweetalert';
import axios from 'axios';
const AddCombo = () => {
    const [img, setImg] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [price, setPrice] = useState('')
    const handleImageChange = (e) => {
        setImg(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(
                img === '' || id === '' ||
                name === '' || des === '' || price === ''){
                    swal({
                        title: "Please enter all fields",
                        dangerMode: true,
                        icon: 'warning'
                    })
                }
            const formData = new FormData()
            formData.append('img', img);
            formData.append('combo_id', id)
            formData.append('combo_name', name)
            formData.append('des', des)
            formData.append('price', price)

            const response = await axios.post('http://localhost:3001/api/v1/admin/add-combo', formData)
            swal({
                title: 'Combo added!!',
                icon: 'success',
            });
            setImg('')
            setId('');
            setName('');
            setDes('');
            setPrice('');
        } catch (error) {
            
        }
    }
    console.log(id, name, img, des, price)

  return (
      <div>
          <h3 style={{marginTop: 10, textAlign: 'center'}}>Add Combo</h3>
          <Form onSubmit={handleSubmit}>
              <Row className="align-items-center my-3">
                  <Col sm={3} className="my-1">
                      <FloatingLabel label="POSTER">
                          <Form.Control type="file" onChange={handleImageChange} required />
                      </FloatingLabel>
                  </Col>
                  <Col sm={3} className="my-1">
                      <FloatingLabel label="MÃ COMBO">
                          <Form.Control
                              type="text"
                              placeholder="Id movie"
                              value={id}
                              onChange={(e) => setId(e.target.value)}
                              required
                          />
                      </FloatingLabel>
                  </Col>
              </Row>
              <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                      <FloatingLabel label="TÊN COMBO">
                          <Form.Control
                              type="text"
                              value={name}
                              placeholder="TÊN COMBO"
                              onChange={(e) => setName(e.target.value)}
                              required
                          />
                      </FloatingLabel>
                  </Col>
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
              </Row>
              <Row className="align-items-center">
                  <Col sm={3} className="my-1">
                      <FloatingLabel label="GIÁ COMBO">
                          <Form.Control
                              type="text"
                              placeholder="GIÁ"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              required
                          />
                      </FloatingLabel>
                  </Col>
                  <Col sm={3} className="my-1">
                      <MyButton onClick={handleSubmit} title={'Add'} />
                  </Col>
              </Row>
          </Form>
      </div>
  );
}

export default AddCombo