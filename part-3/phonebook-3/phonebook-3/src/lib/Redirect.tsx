import React from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to the phonebook page
    navigate('/part-3/phonebook');
  }, [navigate]);

  return null; // No UI to render, just a redirect
};

export default Redirect;