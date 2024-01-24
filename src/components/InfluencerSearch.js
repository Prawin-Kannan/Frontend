import React, { useState } from 'react';
import InfluencerList from './InfluencerList';
import useDragAndDrop from '../hooks/useDragAndDrop';
import { getInfluencers } from '../services/influencerService';

function InfluencerSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [influencers, setInfluencers] = useState([]);

    const handleSearch = async () => {
        try {
            const results = await getInfluencers(searchTerm);
            setInfluencers(results);
        } catch (error) {
            console.error('Error searching influencers:', error);
        }
    };

    const { onDragStart, onDragOver, onDrop } = useDragAndDrop();

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            <InfluencerList
                influencers={influencers}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
            />
        </div>
    );
}

export default InfluencerSearch;
