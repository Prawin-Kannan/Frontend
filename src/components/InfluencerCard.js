// InfluencerCard.js
import React from 'react';

const InfluencerCard = ({ influencer, onDragStart }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('influencerId', influencer.id);
        onDragStart();
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
        >
            <p>{influencer.name}</p>
        </div>
    );
};

export default InfluencerCard;
