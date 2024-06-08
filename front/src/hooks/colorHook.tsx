import { useState, useEffect } from 'react';
import { ColorChoice } from '../utils/interfaces';
import api from '../api';

const useColor = () => {
  const [colorChoices, setColorChoices] = useState<ColorChoice[]>([]);

  const getColorChoices = async () => {
    api
      .get('/base/color-choices/')
      .then((response) => {
        setColorChoices(response.data);
      })
      .catch((error) => console.error('Error fetching color choices:', error));
  };

  useEffect(() => {
    getColorChoices();
  }, []);

  return {
    colorChoices,
  };
};

export default useColor;
