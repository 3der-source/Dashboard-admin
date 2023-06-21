const app = express();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
app.post('/auth/register', async(req, res) => {
    const { username, email, password } = req.body;
    res.send(username, email, password)
})

