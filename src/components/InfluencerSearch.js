import React, { useState } from 'react';
import { getInfluencers } from '../services/influencerService';

const InfluencerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async () => {
        try {
            console.log("searchTerm", searchTerm)
            const results = await getInfluencers(searchTerm);
            setSearchResults(results);
        } catch (error) {
            console.error('Error searching influencers:', error);
        }
    };



    const handleDragStart = (e, influencer) => {
        e.dataTransfer.setData('text/plain', influencer.id);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {searchResults.length > 0 && (
                <div>
                    <h3>Search Results</h3>
                    <ul>
                        {searchResults.map((influencer, index) => (
                            <li key={index} draggable onDragStart={(e) => handleDragStart(e, influencer)}>
                                {influencer.name}
                            </li>
                        ))}

                    </ul>
                </div>
            )}
        </div>
    );
};

export default InfluencerSearch;
