const { readFileSync } = require('fs')
const handleGetUsers = (req, res) => {
    const users = JSON.parse(readFileSync('user.json', 'utf-8'))
    res.status(200).json(users)
}

module.exports = {
    handleGetUsers
}