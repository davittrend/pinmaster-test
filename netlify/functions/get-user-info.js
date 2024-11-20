const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { access_token } = event.queryStringParameters;
    if (!access_token) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Access token is missing" }),
        };
    }

    const apiUrl = "https://api.pinterest.com/v5/me";

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch user info", details: error.message }),
        };
    }
};
