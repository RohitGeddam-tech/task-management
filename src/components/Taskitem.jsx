import React from "react";

const Taskitem = ({
  grpI,
  taskI,
  task,
  dragging,
  getStyles,
  handleDragEnter,
  handletDragStart,
}) => {
  const { id, title } = task;
  return (
    <div
      draggable
      key={id}
      onDragStart={(e) => handletDragStart(e, { grpI, id })}
      onDragEnter={
        dragging
          ? (e) => {
              handleDragEnter(e, { grpI, id });
            }
          : null
      }
      className={dragging ? getStyles({ grpI, id }) : "dnd-item"}
    >
      {title}
    </div>
  );
};

export default Taskitem;
