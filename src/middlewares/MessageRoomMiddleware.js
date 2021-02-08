const Room = require("../models/RoomModel");


module.exports = {
    /****************************/
    //
    //     VALIDATION FIELDS ( if exists )
    //
    /****************************/
    async ValidateFields(req, res, next){

        const { Text, idRoom, idUser, } = req.fields;
        
        // validation 'Text'
        if(Text){
            if(Text.length < 0)
            return res.status(400).send({error: "Text size cannot be less than 0"});
        }
        if(idRoom){
            var obj_idRoom = await Room.find({ _id: idRoom });
            if(obj_idRoom.length == 0)
            return res.status(400).send({error: "idRoom not found"});
        
        }
        // validation 'idUser'
        if(idUser){
            if(idUser.length < 0)
            return res.status(400).send({error: "idUser size cannot be less than 0"});
        }
        next();
    },

    /****************************/
    //
    //      MESSAGEROOM LIST
    //
    /****************************/
    async list(req, res, next){ 
        
        next();
    },


    /****************************/
    //
    //      MESSAGEROOM LISTONE
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
    //      MESSAGEROOM SAVE
    //
    /****************************/
    async save(req, res, next){
        const { idRoom, } = req.fields;

        
        if(!idRoom)
        return res.status(400).send({error: "idRoom is required"});
        
        next();
    },



    /****************************/
    //
    //      MESSAGEROOM UPDATE
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
    //      MESSAGEROOM DELETE
    //
    /****************************/
    async delete(req, res, next){
        const { id } = req.fields;

        if(!id)
        return res.status(400).send({error: "id is required"});

        next();
    }
}