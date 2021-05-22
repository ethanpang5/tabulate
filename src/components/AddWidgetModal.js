import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddWidgetModal = (props) => {
    const [widgetTitle, setWidgetTitle] = useState('');

    const onHide = () => { 
        props.onHide();
        setWidgetTitle('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        onHide();
        props.addWidgetToDashboard(widgetTitle)
    }
    

    return (
      <Modal
        {...props}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Widget
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="websiteName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="" value={widgetTitle} onChange={(e) => setWidgetTitle(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default AddWidgetModal
