const handleProfile = (req, res, pgDatabase) => {
    const { id } = req.params;
    pgDatabase.select('*').from('users').where({
        id: id
    })
        .then(user => {
            console.log(user)
            // when no user exists with the id then empty array is generated
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('user not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    handleProfile
};