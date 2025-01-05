const test = (req,res) => {
    try{
        res.status(200).json({message:"API is Working"})
    }catch(error){
        res.status(400).json({message:"test api error"})
    }
}

export {test};