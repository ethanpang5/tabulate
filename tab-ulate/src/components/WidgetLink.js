import React from 'react'

const WidgetLink = ({link}) => {
    return (
        <>
        <div>
            <a href={link.url} className="classes-link">{link.name}</a>
            <button type="button" class="btn btn-dark delete-button">delete</button>
        </div>
        
        </>
    )
}

export default WidgetLink
