import React from "react";

import WidgetLink from "./WidgetLink";

const Widget = ({ title, links, openModal, removeLink, deleteWidget, changeWidgetTitle }) => {
  const [widgetTitle, setWidgetTitle] = React.useState(title)


  const removeLinkFromThisWidget = (url) => {
    removeLink(title, url);
  };
  const openAllLinks = () => {
    console.log("here");
    for (let i = 0; i < links.length; i++) {
      window.open(links[i].url, "_blank");
    }
  };

  const changeTitle = (event) => {
    const newTitle = event.target.value;
    // setWidgetTitle(newTitle);
    console.log("newTitle:", newTitle)
    changeWidgetTitle(title, newTitle);
  }

  return (
    <div className="widget">
      <div className="widget-header">
        {/* <div className="widget-title">{title}</div> */}

        {/* <span class="input" role="textbox" contenteditable>{title}</span> */}

        <input className="widget-title2" type="text" value={title}
              onChange={changeTitle}
        />
        
        <div className="widget-control">
          <button
            class="btn btn-dark btn-sm action-button"
            onClick={() => deleteWidget(title)}
          >
            delete widget
          </button>
          <button
            class="btn btn-secondary btn-sm action-button"
            onClick={openAllLinks}
          >
            open all
          </button>
          <button
            class="btn btn-success btn-sm action-button"
            onClick={() => openModal(title)}
          >
            new link
          </button>
        </div>
      </div>
      <div className="widget-grid">
        {links.map((lnk) => (
          <WidgetLink link={lnk} removeLink={removeLinkFromThisWidget} />
        ))}
      </div>
    </div>
  );
};

export default Widget;
