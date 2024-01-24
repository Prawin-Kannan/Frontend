// OverlaySidePanel.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import SidePanel from './SidePanel';

const OverlaySidePanel = () => {
    const { user } = useAuth();
    const [selectedInfluencers, setSelectedInfluencers] = React.useState([]);

    // Dummy influencers data (replace it with your actual data)
    const influencers = [
        { id: 1, name: 'Influencer 1' },
        { id: 2, name: 'Influencer 2' },
        { id: 3, name: 'Influencer 3' },
    ];

    const handleInfluencerSelect = (influencer) => {
        setSelectedInfluencers([...selectedInfluencers, influencer]);
    };

    return (
        <div>
            <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
            {/* Add content for the main panel, e.g., search results */}
            <div className="main-panel">
                <h3>Search Results</h3>
                {/* Render your search results here */}
                {influencers.map((influencer) => (
                    <div key={influencer.id}>
                        <span>{influencer.name}</span>
                        <button onClick={() => handleInfluencerSelect(influencer)}>Add</button>
                    </div>
                ))}
            </div>

            {/* Include the SidePanel component */}
            <SidePanel influencers={selectedInfluencers} />
        </div>
    );
};

export default OverlaySidePanel;
