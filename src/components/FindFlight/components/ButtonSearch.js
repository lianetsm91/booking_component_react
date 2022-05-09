import React from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/buttonSearch.css';

const ButtonSearch = () => (
  <Button
    className="button-search"
    htmlType="submit"
    type="primary"
    size="large"
    icon={<FontAwesomeIcon icon="search" className="button-search-icon" />}
  >
    Search
  </Button>
);

export default ButtonSearch;
