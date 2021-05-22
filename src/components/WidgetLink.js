import React from "react";

const WidgetLink = ({ link, removeLink }) => {
  return (
    <>
      <div class="widget-link">
        <a href={link.url} target="_blank" className="classes-link">
          {link.name}
        </a>
        <button
          onClick={() => removeLink(link.url)}
          type="button"
          class="btn btn-dark btn-sm delete-button"
        >
          delete
        </button>
      </div>
    </>
  );
};

export default WidgetLink;
