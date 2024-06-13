import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const ModalCentered = ({ modalContent, onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalContent ? `${modalContent.name} ${modalContent.surname}` : 'Modal Title'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {modalContent ? (
            <div className="space-y-4">
              <p>Department: {modalContent.department}</p>
              <p>Position: {modalContent.position}</p>
              <p>Employee Number: {modalContent.employeeNumber}</p>
              <p>Mail: {modalContent.mail}</p>
              <p>Phone: {modalContent.phone}</p>
            </div>
          ) : (
            'Loading...'
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCentered;
