import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from '..';

import './index.sass';


const NewModal = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(props.open !== open) setOpen(props.open)
  }, [props.open, open]);

  const close = () => {
    setOpen(false);
    props.closeModal();
  }

  return (
    <div>
      <Button color="danger" onClick={close} icon='xmark' />
      <Modal isOpen={open} toggle={close} centered>
        <ModalHeader toggle={close}>{props.title}</ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter>
          <Button label='Cancel' color="secondary" onClick={close} />
          <Button label={props.onConfirmLabel} color="primary" onClick={props.onConfirm} />
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NewModal;