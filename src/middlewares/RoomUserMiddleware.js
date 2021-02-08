const Room = require("../models/RoomModel");


module.exports = {
    /****************************/
    //
    //     VALIDATION FIELDS ( if exists )
    //
    /****************************/
    async ValidateFields(req, res, next){

        const { idRoom, idUser, Type, } = req.fields;
        
        if(idRoom){
            var obj_idRoom = await Room.find({
                where: { id: idRoom }
            });
            if(obj_idRoom.count == 0)
            return res.status(400).send({error: "idRoom not found"});
        
        }
        // validation 'idUser'
        if(idUser){
            if(idUser.length < 0)
            return res.status(400).send({error: "idUser size cannot be less than 0"});
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
    //      ROOMUSER LIST
    //
    /****************************/
    async list(req, res, next){ 
        
        next();
    },


    /****************************/
    //
    //      ROOMUSER LISTONE
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
    //      ROOMUSER SAVE
    //
    /****************************/
    async save(req, res, next){
        const { idRoom, idUser, } = req.fields;

        
        if(!idRoom)
        return res.status(400).send({error: "idRoom is required"});
        
        if(!idUser)
        return res.status(400).send({error: "idUser is required"});
        
        next();
    },



    /****************************/
    //
    //      ROOMUSER UPDATE
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
    //      ROOMUSER DELETE
    //
    /****************************/
    async delete(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    }
}