import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

function TabelaSistemasAntigos() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    noSystemName: '',
    systemName: '',
    systemSymbol: '',
    geneNames: '',
    lrgNumber: '',
    numberOfAntigens: '',
    chromosomalLocation: '',
    cdNumbers: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('bloodSystems');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []); 

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('bloodSystems', JSON.stringify(data));
    }
  }, [data]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        id: null,
        noSystemName: '',
        systemName: '',
        systemSymbol: '',
        geneNames: '',
        lrgNumber: '',
        numberOfAntigens: '',
        chromosomalLocation: '',
        cdNumbers: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveData = () => {
    if (formData.id === null) {

      setData([...data, { ...formData, id: data.length + 1 }]);
    } else {

      setData(data.map(item => (item.id === formData.id ? formData : item)));
    }
    handleCloseModal();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Table of blood group systems</h1>
      <Button variant="primary" onClick={() => handleOpenModal()}>
        Add System
      </Button>

      {}
      <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Title>{formData.id === null ? '' : ''}</Modal.Title>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNoSystemName">
              <Form.Label>No.</Form.Label>
              <Form.Control
                type="text"
                name="noSystemName"
                value={formData.noSystemName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSystemName">
              <Form.Label>System Name</Form.Label>
              <Form.Control
                type="text"
                name="systemName"
                value={formData.systemName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formSystemSymbol">
              <Form.Label>System Symbol</Form.Label>
              <Form.Control
                type="text"
                name="systemSymbol"
                value={formData.systemSymbol}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formGeneNames">
              <Form.Label>Gene Name(s)</Form.Label>
              <Form.Control
                type="text"
                name="geneNames"
                value={formData.geneNames}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLrgNumber">
              <Form.Label>LRG Number</Form.Label>
              <Form.Control
                type="text"
                name="lrgNumber"
                value={formData.lrgNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formNumberOfAntigens">
              <Form.Label>Number of Antigens</Form.Label>
              <Form.Control
                type="text"
                name="numberOfAntigens"
                value={formData.numberOfAntigens}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formChromosomalLocation">
              <Form.Label>Chromosomal Location</Form.Label>
              <Form.Control
                type="text"
                name="chromosomalLocation"
                value={formData.chromosomalLocation}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formCdNumbers">
              <Form.Label>CD Numbers</Form.Label>
              <Form.Control
                type="text"
                name="cdNumbers"
                value={formData.cdNumbers}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="primary" onClick={handleSaveData}>
            {formData.id === null ? 'Add' : 'Save'}
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>No.</th>
            <th>System Name</th>
            <th>System Symbol</th>
            <th>Gene Name(s)</th>
            <th>LRG Number</th>
            <th>Number of Antigens</th>
            <th>Chromosomal Location</th>
            <th>CD Numbers</th>
            <th>Actions</th> {}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.noSystemName}</td>
              <td>{item.systemName}</td>
              <td>{item.systemSymbol}</td>
              <td>{item.geneNames}</td>
              <td>{item.lrgNumber}</td>
              <td>{item.numberOfAntigens}</td>
              <td>{item.chromosomalLocation}</td>
              <td>{item.cdNumbers}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleOpenModal(item)}
                  title="Edit"
                >
                  <PencilSquare />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
                  <Trash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TabelaSistemasAntigos;
