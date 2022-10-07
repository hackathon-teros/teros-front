import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { terosService } from '../../service/TerosService';

interface Login {
  isOpen: boolean;
  setIsOpen: any;
}

export function LoginModal({ isOpen, setIsOpen }: Login) {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const login = async () => {
    const { data } = await terosService.login(email, pass);
    localStorage.setItem('token', data.token);
    setIsOpen(false);
  };

  return (
    <Modal className='vapor1' isOpen={isOpen}>
      <ModalHeader>Login</ModalHeader>
      <ModalBody className='login'>
        <input className='input'
          type='text'
          placeholder='Email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className='input'
          type='text'
          placeholder='Senha'
          value={pass}
          onChange={(event) => setPass(event.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button className='button-5' color='primary' onClick={login}>
          Login
        </Button>{' '}
        <Button className='button-5' color='secondary' onClick={() => setIsOpen(false)}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
