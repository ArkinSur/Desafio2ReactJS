import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const [route, setRoute] = useState('dashboard');

  return (
    <Container name={route} size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link
            style={{ color: route === 'dashboard' ? '#ff872c' : '#fff' }}
            id="dashboard"
            onClick={() => setRoute('dashboard')}
            to="/"
          >
            Listagem
          </Link>
          <Link
            style={{ color: route === 'import' ? '#ff872c' : '#fff' }}
            id="import"
            onClick={() => setRoute('import')}
            to="/import"
          >
            Importar
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
