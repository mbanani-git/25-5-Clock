import React from "react";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="todo-item" key={id}>
            <div className="title">
              <i className="bi bi-record-circle-fill "></i>
              <p>{title}</p>
            </div>
            <div className="btn-container">
              <button type="button" className="btn btn-edit" onClick={() => editItem(id)}>
                <i className="bi bi-pencil-square"></i>
              </button>
              <button type="button" className="btn btn-remove" onClick={() => removeItem(id)}>
                <i className="bi bi-trash2-fill"></i>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
