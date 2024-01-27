import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidePanel from './SidePanel';
import InfluencerSearch from './InfluencerSearch';
import '../styles/OverlaySidePanel.css';
import { useLocation } from 'react-router-dom';
const OverlaySidePanel = () => {
    const location = useLocation();
    const userData = location.state?.userData;
    const [influencers, setInfluencers] = useState([]);



    let [selectedInfluencers, setSelectedInfluencers] = useState([]);

    function modifyArray(inputArray) {
        const newArray = inputArray.map(name => ({
            _id: generateRandomId(24),
            name: (name),
            __v: 0
        }));

        return newArray;
    }

    function generateRandomId(length) {
        // Generate a random string of the specified length for _id
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }
        return randomId;
    }


    useEffect(() => {
        // Fetch influencers data from the backend API
        const fetchInfluencers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/influencers/influencers');
                console.log("res", response.data)
                setInfluencers(response.data);
            } catch (error) {
                console.error('Error fetching influencers:', error);
            }
        };

        fetchInfluencers();

    }, []);
    useEffect(() => {
        // Fetch influencers data from the user table in the backend API
        const fetchUserInfluencers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/auth/userInfluencers', {
                    params: {
                        userName: userData.name
                    }
                });

                setSelectedInfluencers(response.data.influencers);
            } catch (error) {
                console.error('Error fetching user influencers:', error);
            }
        };

        fetchUserInfluencers();
    }, [userData]);

    const handleDragStart = (e, influencer) => {
        e.dataTransfer.setData('influencerId', influencer.name);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const influencerId = e.dataTransfer.getData('influencerId');
        const draggedInfluencer = influencers.find((influencer) => influencer.name === influencerId);

        // Check if the dragged influencer is not already in the selectedInfluencers array
        if (draggedInfluencer && !selectedInfluencers.find((influencer) => influencer.name === draggedInfluencer.name)) {
            setSelectedInfluencers([...selectedInfluencers, draggedInfluencer]);
        }
    };
    const handleClearSelectedInfluencers = () => {
        setSelectedInfluencers([]);
    };
    const handleSaveSelectedInfluencers = async () => {
        try {

            const modifiedArray = modifyArray(selectedInfluencers);
            selectedInfluencers = modifiedArray;
            console.log("selectedInfluencers", selectedInfluencers);
            await axios.post('http://localhost:5000/auth/influencersave', {
                influencers: selectedInfluencers.map(influencer => influencer.name),
                userName: userData.name
            });
            alert('Selected influencers saved successfully!');
            // Handle success or navigate to another page
        } catch (error) {
            console.error('Error saving influencers:', error);
        }
    };

    return (
        <div className="container">
            <h2>Welcome, {userData ? userData.name : 'Guest'}!</h2>
            <InfluencerSearch />
            {/* Main panel */}
            <div className="main-panel">
                <h3>Influencer List</h3>
                {influencers.map((influencer) => (
                    <button
                        key={influencer.name}
                        draggable
                        className="draggable"
                        onDragStart={(e) => handleDragStart(e, influencer)}
                        onClick={() => {
                            // Check if the selected influencer is not already in selectedInfluencers array
                            if (!selectedInfluencers.find((selected) => selected.name === influencer.name)) {
                                setSelectedInfluencers([...selectedInfluencers, influencer]);
                            }
                        }}
                    >
                        {influencer.name}
                    </button>
                ))}

            </div>

            {/* Side panel */}
            <div className="side-panel drop-target" onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e)}>
                <SidePanel influencers={selectedInfluencers} />
                <button onClick={handleClearSelectedInfluencers}>Clear Selected</button>
                <button onClick={handleSaveSelectedInfluencers}>Save Selected</button>
            </div>
        </div>


    );
};

export default OverlaySidePanel;
