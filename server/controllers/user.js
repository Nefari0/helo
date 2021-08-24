
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req,res) => {
        const db = req.app.get('db')
        const {user_name,password,profile_pic} = req.body
        const result = await db.user.get_user_by_username([user_name])
        // const existingUser = await db.user.get_user_by_username([user_name])
        const existingUser = result[0]
        // const existingUser = await req.app.get('db').get_user_by_username([user_name])
        
        if (existingUser) {
            return res.status(409).send('User already exists')
        }
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const newUser = await db.user.create_user([user_name,hash,profile_pic]) // test end point { "user_name":"newName","password":"pass","profile_pic":"pictext"}
        const user = newUser[0];
        console.log('this is new user', newUser)
        
        req.session.user = {
            user:user_name,
            id:user.id
        };
        return res.status(201).send(req.session.user)

    },

    login: async (req,res) => {
        const db = req.app.get('db')
        const { user_name, password } = req.body
        const foundUser = await db.user.get_user_by_username([user_name]);
        const user = foundUser[0];
        console.log('find user?',user)
        // if (!user) {
        // if (!user) {
        //     return res.status(401).send('user not found');
        // }
        // const isAuthenticated = bcrypt.compareSync(password, user.hash);
        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect Password');
        }
        req.session.user = {
            user: user.user_name,
        }
        return res.status(200).send(req.session.user)
    }
}