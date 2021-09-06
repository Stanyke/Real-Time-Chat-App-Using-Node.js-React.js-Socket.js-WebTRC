class postService{

    pingMe = async () => {
        return {"data": {"success": true, "message": 'Pinged'}, "statusCode": 200}
    }

    getPosts = async (params) => {
        try{

        }
        catch(err){
            
        }
    }
}

module.exports = postService