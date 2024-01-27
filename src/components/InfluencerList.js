// InfluencerList.js
import React from 'react';
import InfluencerCard from './InfluencerCard';
import useDragAndDrop from '../hooks/useDragAndDrop'; 

const InfluencerList = ({ influencers }) => {
    const { onDragStart, onDragOver, onDrop } = useDragAndDrop();

    return (
        <div>
            {influencers.map(influencer => (
                <InfluencerCard
                    key={influencer.id}
                    influencer={influencer}
                    onDragStart={(e) => onDragStart(e, influencer)}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={(e) => onDrop(e, influencer)}
                />
            ))}
        </div>
    );
};

export default InfluencerList;