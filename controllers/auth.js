import User from '../models/user';



export const register = async (req, res) => {
    console.log(req.body);
    const {name, email, password} = req.body;
    // validation
    if(!name) return res.status(400).send('Name is required');
    if(!password || password.lenght < 6) return res.status(400).send('Password is required and should be at least 6 characters');
    let userExists = await User.findOne({email}).exec();
    if(userExists) return res.status(400).send('User already exists');

    //register user

    const user = new User(req.body)
    try {
        await user.save();
        console.log('USER CREATED', user);
        return res.json({ok: true});
        
    } catch (err) {
        console.log('CREATE USER ERROR: ', err);
        return res.status(400).send('Error  try again');
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
      let user = await User.findOne({email}).exec();
      if(!user) return res.status(400).send('User does not exist');
      // compare password
      user.comparePassword(password, (err, match) => {
          console.log("COMPARE PASSWORD IN LOGIN ERR", err)
          if(!match || err) return res.status(400).send('Invalid Password')
          console.log('GENERATING TOKEN');
      })
    } catch (err) {
        console.log('LOGIN ERROR: ', err);
        return res.status(400).send('Error  try again');
    }
}