// useDragAndDrop.js
import { useState } from 'react';

const useDragAndDrop = () => {
    const [draggedItem, setDraggedItem] = useState(null);

    const onDragStart = (e, item) => {
        setDraggedItem(item);
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const onDrop = (e, item) => {
        e.preventDefault();
        // Handle drop logic here
    };

    return { draggedItem, onDragStart, onDragOver, onDrop };
};

export default useDragAndDrop;
