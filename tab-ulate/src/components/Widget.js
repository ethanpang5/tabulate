import React from 'react';

import WidgetLink from './WidgetLink';

const Widget = ({title, links, openModal, removeLink}) => {
    const removeLinkFromThisWidget = (url) => {
        removeLink(title, url);
    }
    const openAllLinks = () => {
        console.log('here')
        for (let i=0; i < links.length; i++) {
            window.open(links[i].url, "_blank")
        }
    }
    return (
        <div className="widget">
            <div className="widget-header">
                <a className="widget-title">{title}</a>
                <div className="widget-control">
                    <a onClick={openAllLinks}>open all</a>
                    <a onClick={() => openModal(title)}>new</a>
                </div>
            </div>
            <div className="widget-grid" id="classes">
                {links.map((lnk) => (
                    <WidgetLink link={lnk} removeLink={removeLinkFromThisWidget}/>
                ))}
            </div>
        </div>
    )
}

export default Widget
