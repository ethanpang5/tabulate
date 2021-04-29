/*global chrome*/
import React from 'react';

import WidgetLink from './WidgetLink';

const Widget = ({title, links, openModal, removeLink, deleteWidget}) => {
    const removeLinkFromThisWidget = (url) => {
        removeLink(title, url);
    }

    const openAllLinks = async () => {
        for (let i=0; i < links.length; i++) {
            // window.open(links[i].url, "_blank")
            await chrome.tabs.create({ url: links[i].url })
        }
    }

    return (
        <div className="widget">
            <div className="widget-header">
                <a className="widget-title">{title}</a>
                <div className="widget-control">
                    <a onClick={() => deleteWidget(title)}>delete</a>
                    <a onClick={openAllLinks}>open all</a>
                    <a onClick={() => openModal(title)}>new</a>
                </div>
            </div>
            <div className="widget-grid">
                {links.map((lnk) => (
                    <WidgetLink link={lnk} removeLink={removeLinkFromThisWidget}/>
                ))}
            </div>
        </div>
    )
}

export default Widget
