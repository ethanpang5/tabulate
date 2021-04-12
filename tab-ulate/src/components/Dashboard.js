import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

import Widget from './Widget';

function MyVerticallyCenteredModal(props) {
    const [website, setWebsite] = useState('');
    const [url, setUrl] = useState('');

    const onHide = () => { 
        props.onHide();
        setWebsite('');
        setUrl('');
    }

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(website, url, props.currWidget);
        onHide();
        props.addLinkToWidget(website, url, props.currWidget)
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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Add Website</h4>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="websiteName">
                    <Form.Label>Website name</Form.Label>
                    <Form.Control type="text" placeholder="" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="url">
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="text" placeholder="" value={url} onChange={(e) => setUrl(e.target.value)}/>
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
  

const Dashboard = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [currWidget, setCurrWidget] = React.useState('');
    const [widgets, setWidgets] = React.useState([ 
        {
            title:"Classes", 
            links: [
                {url: 'sp21.datastructur.es', name: 'CS61B'},
                {url: 'https://www.notion.so/Cubstart-Intro-to-Building-Apps-d42282d66dd942c399b6ce87167889d6', name: 'Cubstart'},
                {url: 'https://www.eecs70.org/', name: 'CS70'},
            ]
        },
        {
            title:"Favorites", 
            links: [
                {url: 'sp21.datastructur.es', name: 'weird link'},
                {url: 'https://www.notion.so/Cubstart-Intro-to-Building-Apps-d42282d66dd942c399b6ce87167889d6', name: 'Cubstart'},
                {url: 'https://www.eecs70.org/', name: 'CS70'},
            ]
        },
    ])
    
    const addLinkToWidget = (website, url, widgetName) => {
        const toEdit = widgets.find(obj => {
            return obj.title === widgetName
        });
        toEdit.links.push({url: url, name: website});
        const newState = widgets.map((obj) => obj);
        setWidgets(newState);
    }

    const removeLinkFromWidget = (widgetName, url) => {
        const widget = widgets.find(obj => {
            return obj.title === widgetName
        });

        widget.links = widget.links.filter((obj) => {
            return obj.url.localeCompare(url) != 0
        });

        const newState = widgets.map((obj) => obj)
        setWidgets(newState)
    }

    const openModal = (widgetName) => {
        setModalShow(true);
        setCurrWidget(widgetName);
    }

    return (
        <>
            <div className="dashboard-grid">
                {widgets.map((widget) => (
                    <Widget title={widget.title} links={widget.links} 
                    openModal={openModal} removeLink={removeLinkFromWidget}
                    />
                ))}
            </div>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                currWidget={currWidget}
                addLinkToWidget={addLinkToWidget}
            />
        </>
    )
}

export default Dashboard
