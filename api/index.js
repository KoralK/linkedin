const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://linkedin-data-api.p.rapidapi.com/get-job-details', {
      headers: {
        'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
        'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY'
      },
      params: {
        id: '3738360408' // Example job ID, you might want to replace this with a dynamic parameter
      }
    });

    const jobData = response.data.data;

    if (jobData) {
      // Filter jobs for IT sector and sponsorship availability
      const isITSector = jobData.jobFunctions.includes('IT');
      const hasSponsorship = jobData.description.toLowerCase().includes('sponsorship');

      if (isITSector && hasSponsorship) {
        res.status(200).json({
          success: true,
          message: 'Found IT job with sponsorship',
          data: jobData
        });
      } else {
        res.status(200).json({
          success: false,
          message: 'No IT jobs with sponsorship found',
          data: {}
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Job not found',
        data: {}
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred',
      error: error.message
    });
  }
};
