// services/influencerService.js
import axios from 'axios';

export const getInfluencers = async (searchTerm) => {
    try {
        console.log("ss",searchTerm)
        // Make a GET request to your backend API to fetch influencers
        const response = await axios.get(`http://localhost:5000/influencers/influencersname?name=${searchTerm}`);
        // Extract and return the data from the response
        return response.data;
    } catch (error) {
        console.error('Error fetching influencers:', error);
        throw error; // Propagate the error to the caller
    }
};
