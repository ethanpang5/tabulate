/*global chrome*/
import React from 'react';

import WidgetLink from "./WidgetLink";

const Widget = ({ title, links, openModal, removeLink, deleteWidget }) => {
  const removeLinkFromThisWidget = (url) => {
    removeLink(title, url);
  };
  const openAllLinks = async () => {
    for (let i=0; i < links.length; i++) {
        // window.open(links[i].url, "_blank")
        await chrome.tabs.create({ url: links[i].url })
    }
  }
  return (
    <div className="widget">
      <div className="widget-header">
        <div className="widget-title">{title}</div>
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
