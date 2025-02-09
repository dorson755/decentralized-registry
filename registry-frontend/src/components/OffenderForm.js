import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addOffender } from '../services/api';

const OffenderForm = ({ token }) => {
  const [offenderData, setOffenderData] = useState({
    offenderID: '',
    name: '',
    courtProof: '',
    socialProof: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOffenderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addOffender(offenderData, token);
      console.log('Offender added:', result);
      // Reset form after submission
      setOffenderData({
        offenderID: '',
        name: '',
        courtProof: '',
        socialProof: '',
      });
    } catch (error) {
      console.error('Failed to add offender:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="offenderID">
        <Form.Label>Offender ID</Form.Label>
        <Form.Control
          type="text"
          name="offenderID"
          value={offenderData.offenderID}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={offenderData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="courtProof">
        <Form.Label>Court Proof</Form.Label>
        <Form.Control
          type="text"
          name="courtProof"
          value={offenderData.courtProof}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="socialProof">
        <Form.Label>Social Proof</Form.Label>
        <Form.Control
          type="text"
          name="socialProof"
          value={offenderData.socialProof}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Offender
      </Button>
    </Form>
  );
};

export default OffenderForm;
