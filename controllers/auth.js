

export const showMessage =  (req, res) => {
    res.status(200).send(`Hello ${req.params.message}`);
     
}   

export const register = async (req, res) => {
    console.log(req.body);
}