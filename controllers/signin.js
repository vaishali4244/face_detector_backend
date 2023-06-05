const handleSignin = (req, res, pgDatabase , bcrypt) => {
    const { email,password } = req.body;
    if(!email ||!password){
        return  res.status(400).json('incorrect form submission')
    }
    pgDatabase.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            console.log(isValid);
            if (isValid) {
                return pgDatabase.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        console.log(user);
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('wrong credentials entered')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
}

module.exports =  {
    handleSignin: handleSignin
    };