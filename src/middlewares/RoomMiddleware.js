

module.exports = {
    /****************************/
    //
    //     VALIDATION FIELDS ( if exists )
    //
    /****************************/
    async ValidateFields(req, res, next){

        const { Title, Type, } = req.fields;
        
        // validation 'Title'
        if(Title){
            if(Title.length < 6)
            return res.status(400).send({error: "Title size cannot be less than 6"});
        }
        // validation 'Type'
        if(Type){
            if(Type < 0)
            return res.status(400).send({error: "Type size cannot be less than 0"});
        }
        next();
    },

    /****************************/
    //
    //      ROOM LIST
    //
    /****************************/
    async list(req, res, next){ 
        
        next();
    },


    /****************************/
    //
    //      ROOM LISTONE
    //
    /****************************/
    async listOne(req, res, next){
        const { id } = req.params;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    },


    /****************************/
    //
    //      ROOM SAVE
    //
    /****************************/
    async save(req, res, next){
        const { Title, } = req.fields;

        
        if(!Title)
        return res.status(400).send({error: "Title is required"});
        
        next();
    },



    /****************************/
    //
    //      ROOM UPDATE
    //
    /****************************/
    async update(req, res, next){
        const { id } = req.fields;
        
        if(!id)
        return res.status(400).send({error: "id is required"});
        
        
        next();
    },

    /****************************/
    //
    //      ROOM DELETE
    //
    /****************************/
    async delete(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    }
}