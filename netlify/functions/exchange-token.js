const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { code } = event.queryStringParameters;
    if (!code) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Authorization code is missing" }),
        };
    }

    const clientId = "1507772";
    const clientSecret = "12e86e7dd050a39888c5e753908e80fae94f7367";
    const redirectUri = "https://pinmaster.netlify.app/callback";

    const tokenUrl = "https://api.pinterest.com/v5/oauth/token";

    try {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const data = await response.json();
        if (data.access_token) {
            return {
                statusCode: 200,
                body: JSON.stringify({ access_token: data.access_token }),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error || "Token exchange failed" }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
        };
    }
};
