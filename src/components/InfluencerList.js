import React from 'react';
import InfluencerCard from './InfluencerCard';

function InfluencerList({ influencers, onDragStart, onDragOver, onDrop }) {
    return (
        <div>
            {influencers.map((influencer) => (
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
}

export default InfluencerList;
