import React, { useState, useRef, useEffect } from "react";
import Taskitem from "./Taskitem";

function Tasklist({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, targetItem) => {
    console.log(dragItem.current, targetItem);
    if (dragItemNode.current !== e.target) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        const targetIndex = newList[targetItem.grpI].tasks.findIndex(
          (doc) => doc.id === targetItem.id
        );
        const currentIndex = newList[dragItem.current.grpI].tasks.findIndex(
          (doc) => doc.id === dragItem.current.id
        );
        newList[targetItem.grpI].tasks.splice(
          targetIndex,
          0,
          newList[dragItem.current.grpI].tasks.splice(currentIndex, 1)[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem("tasks", JSON.stringify(newList));
        return newList;
      });
    }
  };

  const handleDragEnd = (e) => {
    setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;
  };

  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return "dnd-item current";
    }
    return "dnd-item";
  };

  if (list) {
    return (
      <div className="drag-n-drop">
        {list.map((grp, grpI) => (
          <div
            key={grp?.title}
            onDragEnter={
              dragging && !grp.tasks.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            className="dnd-group"
          >
            <h3>{grp?.title}</h3>
            {grp?.tasks?.map((task, taskI) => (
              <Taskitem
                key={taskI}
                task={task}
                taskI={taskI}
                grpI={grpI}
                dragging={dragging}
                getStyles={getStyles}
                handleDragEnter={handleDragEnter}
                handletDragStart={handletDragStart}
              />
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
}

export default Tasklist;
