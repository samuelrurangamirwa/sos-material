const express = require('express');
const router = express.Router();

// Your Mock Database / in memory data
const USERS_DB = [
    { id: 1, internalId: 'secret_8821', username: 'alphacoder', email: 'alpha@example.com', joinDate: '2023-01-15' },
    { id: 2, internalId: 'secret_9942', username: 'dev_sam', email: 'sam@example.com', joinDate: '2024-03-20' },
    { id: 3, internalId: 'secret_1105', username: 'tech_wizard', email: 'wizard@example.com', joinDate: '2023-11-10' }
];

router.get('/v1/public-users', (req, res) => {
    // 1. Use .map() to create a new array and project only specific fields
    // This prevents the 'internalId' and 'email' from leaking to the client
    const publicUsers = USERS_DB.map(user => ({
        username: user.username,
        joinDate: user.joinDate
    }));

    // 2. Sort the resulting list by joinDate in descending order
    // We sort the NEW array (publicUsers), leaving USERS_DB in its original order
    publicUsers.sort((a, b) => {
        return new Date(b.joinDate) - new Date(a.joinDate);
    });

    // 3. Return the sanitized, sorted data
    // "Sanitized" here means the response was cleaned to remove private/internal fields
    // like internalId and email, so only safe public data is sent to the client.
    res.status(200).json(publicUsers);
});

module.exports = router;
