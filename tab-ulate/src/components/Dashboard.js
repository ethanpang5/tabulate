/*global chrome*/
import React, { useState, useEffect, useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";
import {
  addWidget as addWidgetFirebase,
  deleteWidget as deleteWidgetFirebase,
  getWidgets as getWidgetsFirebase,
  addLinkToWidget as addLinkFirebase,
  deleteLink as deleteLinkFirebase,
  db,
} from "../scripts/login.js";
import { UserContext } from "../providers/UserProvider";

function MyVerticallyCenteredModal(props) {
  const [website, setWebsite] = useState("");
  const [url, setUrl] = useState("");

  const onHide = () => {
    props.onHide();
    setWebsite("");
    setUrl("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(website, url, props.currWidget);
    onHide();
    props.addLinkToWidget(website, url, props.currWidget);
  };

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
          Add to {props.currWidget} 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="websiteName">
            <Form.Label>Website name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
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
    const user = useContext(UserContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [currWidget, setCurrWidget] = React.useState('');
    const [showWidgetModal, setShowWidgetModal] = useState(false);
    const [widgets, setWidgets] = React.useState([])
    const [recents, setRecents] = useState([])

    useEffect (() => {
        chrome.history.search({text: '', maxResults: 20}, function(data) {
                const updated = []
                data.forEach(function(page) {
                    updated.push({ title: page.title, url: page.url })
                    console.log(updated)
                });
                setRecents(updated);
              });
    }, [])

    const userEmail = user?.email?.replace('@', '%40') //"charlesming2002%40gmail.com"

  const fetchWidgets = async (user) => {
    const response = db.collection("users").doc(user.displayName);
    const data = await response.get();
    const w = await data.data().widgets;
    console.log("w", w);
    setWidgets(w);
  };

  useEffect(() => {
    console.log("outside if", user);
    if (user) {
      console.log("inside", user);
      fetchWidgets(user);
    }
  }, [user]);

  const addLinkToWidget = (website, url, widgetName) => {
    const toEdit = widgets.find((obj) => {
      return obj.title === widgetName;
    });
    toEdit.links.push({ url: url, name: website });
    const newState = widgets.map((obj) => obj);
    setWidgets(newState);
    addLinkFirebase(widgetName, website, url); //sync firebase
  };

  const removeLinkFromWidget = (widgetName, url) => {
    const widget = widgets.find((obj) => {
      return obj.title === widgetName;
    });
    widget.links = widget.links.filter((obj) => {
      return obj.url !== url;
    });
    const newState = widgets.map((obj) => obj);
    setWidgets(newState);
    deleteLinkFirebase(widgetName, url); //sync firebase
  };

  const openModal = (widgetName) => {
    setModalShow(true);
    setCurrWidget(widgetName); //sync firebase
  };

  const openWidgetModal = () => {
    setShowWidgetModal(true);
  };

  const addWidgetToDashboard = (title) => {
    const old = widgets.map((obj) => obj);
    old.push({ title: title, links: [] });
    setWidgets(old);
    addWidgetFirebase(title); //sync firebase
  };

  const deleteWidget = (widgetName) => {
    console.log("delete");
    const newState = widgets.filter((obj) => {
      return obj.title !== widgetName;
    });
    setWidgets(newState);
    deleteWidgetFirebase(widgetName);
  };

  return (
    <>
      {user ? (
        <>
          <div className="dashboard-grid">
            {widgets.map((widget) => (
              <Widget
                title={widget.title}
                links={widget.links}
                openModal={openModal}
                removeLink={removeLinkFromWidget}
                deleteWidget={deleteWidget}
                isActive={ currWidget === widget.title }
                onClick = { () => {
                  console.log(widget.title)
                  setCurrWidget(widget.title) 
                  }}
              />
            ))}
            <div className="widget">
              <div className="widget-header">
                <div className="widget-title">Recents</div>
              </div>
              <div className="widget-grid" id="recents">
                {recents.map((recent) => (
                  <div className="widget-link">
                    <a
                      href={recent.url}
                      target="_blank"
                      className="classes-link"
                    >
                      {recent.title}
                    </a>
                    { currWidget ? 
                      <button
                        class="btn btn-success btn-xs"
                        onClick={() => {
                          if (currWidget) {
                            addLinkToWidget(recent.title, recent.url, currWidget)
                          }
                          }}
                      >
                        +
                      </button>
                    : null}
                  </div>
                ))}
              </div>
            </div>
            <div className="widget">
              <div className="widget-header">
                <div className="widget-title">Calendar</div>
              </div>
              <iframe
                src={
                  "https://www.google.com/calendar/embed?src=" +
                  userEmail +
                  "&ctz=America%2FLos_Angeles"
                }
                title="calendar"
                width="100%"
                height="400"
                frameborder="0"
                scrolling="no"
              />
            </div>
          </div>
          <div class="addWidgetContainer">
            <button
              class="addWidgetButton"
              type="button"
              class="btn btn-primary"
              onClick={() => openWidgetModal()}
            >
              Add widget
            </button>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            currWidget={currWidget}
            addLinkToWidget={addLinkToWidget}
          />
          <AddWidgetModal
            show={showWidgetModal}
            onHide={() => setShowWidgetModal(false)}
            addWidgetToDashboard={addWidgetToDashboard}
          />
        </>
      ) : (
        <h1>Please Sign in</h1>
      )}
    </>
  );
};

export default Dashboard;
