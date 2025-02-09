import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import api from '../services/api';

const OffenderList = ({ token }) => {
  const [offenders, setOffenders] = useState([]);

  useEffect(() => {
    const fetchOffenders = async () => {
      try {
        const response = await api.get('/offenders', {
          headers: {
            Authorization: token,
          },
        });
        setOffenders(response.data);
      } catch (error) {
        console.error('Error fetching offenders:', error);
      }
    };

    fetchOffenders();
  }, [token]);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Offender ID</th>
          <th>Name</th>
          <th>Court Proof</th>
          <th>Social Proof</th>
        </tr>
      </thead>
      <tbody>
        {offenders.map((offender) => (
          <tr key={offender.offenderID}>
            <td>{offender.offenderID}</td>
            <td>{offender.name}</td>
            <td>{offender.courtProof}</td>
            <td>{offender.socialProof}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default OffenderList;
