// SidePanel.js
import React from 'react';
import '../styles/SidePanel.css'; // Import the CSS for styling

const SidePanel = ({ influencers }) => {
    return (
        <div className="side-panel">
            <h2>Selected Influencers</h2>
            <ul>
                {influencers.map((influencer) => (
                    <li key={influencer.id}>{influencer.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default SidePanel;
