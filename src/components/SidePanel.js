import '../styles/SidePanel.css';
import React from 'react';

const SidePanel = ({ influencers }) => {
    return (
        <div>
            <h3>Selected Influencers</h3>
            <ul>
                {influencers.map((influencer, index) => (
                    <li key={index}>
                        {typeof influencer === 'object' ? influencer.name : influencer}
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default SidePanel;
