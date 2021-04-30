import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";
import {
  addWidget as addWidgetFirebase,
  deleteWidget as deleteWidgetFirebase,
  getWidgets as getWidgetsFirebase,
  addLinkToWidget as addLinkFirebase,
  deleteLink as deleteLinkFirebase,
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
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Add Website</h4>
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

const Dashboard = (props) => {
  const user = useContext(UserContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [currWidget, setCurrWidget] = React.useState("");
  const [showWidgetModal, setShowWidgetModal] = useState(false);
  const [widgets, setWidgets] = useState(props.widgets);
  // const [widgets, setWidgets] = React.useState([
  //   {
  //     title: "Classes",
  //     links: [
  //       { url: "sp21.datastructur.es", name: "CS61B" },
  //       {
  //         url:
  //           "https://www.notion.so/Cubstart-Intro-to-Building-Apps-d42282d66dd942c399b6ce87167889d6",
  //         name: "Cubstart",
  //       },
  //       { url: "https://www.eecs70.org/", name: "CS70" },
  //     ],
  //   },
  //   {
  //     title: "Favorites",
  //     links: [
  //       { url: "sp21.datastructur.es", name: "weird link" },
  //       {
  //         url:
  //           "https://www.notion.so/Cubstart-Intro-to-Building-Apps-d42282d66dd942c399b6ce87167889d6",
  //         name: "Cubstart",
  //       },
  //       { url: "https://www.eecs70.org/", name: "CS70" },
  //     ],
  //   },
  // ]);
  const [recents, setRecents] = useState([
    {
      title: "Youtube",
      url: "https://www.youtube.com",
    },
    {
      title: "Netflix",
      url: "https://www.netflix.com",
    },
    {
      title: "Google",
      url: "https://www.google.com",
    },
  ]);

  const userEmail = user?.email?.replace("@", "%40"); //"charlesming2002%40gmail.com"

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

  const getWidgets = async () => {};

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
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => openWidgetModal()}
          >
            Add widget
          </button>
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
