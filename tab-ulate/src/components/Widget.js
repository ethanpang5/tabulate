import React from 'react';

import WidgetLink from './WidgetLink';

const Widget = ({title, links, openModal}) => {
    return (
        <div className="widget">
            <div className="widget-header">
                <a className="widget-title">{title}</a>
                <div className="widget-control">
                    <a>open all</a>
                    <a onClick={() => openModal(title)}>add</a>
                    <a>delete</a>
                </div>
            </div>
            <div className="widget-grid" id="classes">
                {links.map((lnk) => (
                    <WidgetLink link={lnk}/>
                ))}
            </div>
        </div>
    )
}

export default Widget
