import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';

const UserInfoModal = ({isOpen ,onClose}) => {
        return (
            <div>
                <Modal isOpen={isOpen}>
                    <ModalHeader>Modal title</ModalHeader>
                    <ModalBody>
                        <Input type="textarea" placeholder="Write something (data should remain in modal if unmountOnClose is set to false)" rows={5} />
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={setToggle}>Do Something</Button>{' '} */}
                        <Button color="secondary" onClick={onClose}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }


export default UserInfoModal;