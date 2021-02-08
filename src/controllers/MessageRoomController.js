// - - - - - - - - - - - - - - - - - -
//         IMPORT MODULES
//
const MessageRoom = require("../models/MessageRoomModel");
const crypto = require("crypto");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Room = require("../models/RoomModel");

module.exports = {



    /****************************/
    //
    //      MESSAGEROOM LIST
    //
    /****************************/

    async list(req, res){ 
        
        await MessageRoom.find(req.fields).then(async result => {


            // ANALIZING ALL REGISTERS
            for (let i = 0; i < result.length; i++){
                var element = result[i];
                
                // ADD RELATION
                    //console.log(element)
                    var objidRoom = await Room.findOne({ _id: element.idRoom});
                    result[i].idRoom = objidRoom._id;
                    
            }

            return res.send(result);
        }).catch(err => {
            //console.log(err)
            return res.send({error: err});
        })
    },




    /****************************/
    //
    //      MESSAGEROOM LISTONE
    //
    /****************************/

    async listOne(req, res){
        await MessageRoom.findOne({
                where: {
                id: req.params.id
            }
        }).then(result => {
            if(result)
            return res.send(result);
            else
            return res.send({error:"NOT FOUND"});
        }).catch(err => {
            return res.send({error: err});
        })
    },



    /****************************/
    //
    //      MESSAGEROOM SAVE
    //
    /****************************/
    async save(req, res){   
        
        // save
        await MessageRoom.create( req.fields ).then( async result => {
            if(result){
                return res.send({status: "OK", obj_save: result });
            }else
            return res.send({status: "ERRO", obj_save: result });
        }).catch(err => {
            return res.send({error: err});
        });
        
    },


    /****************************/
    //
    //      MESSAGEROOM UPDATE
    //
    /****************************/
    async update(req, res){
        
        await MessageRoom.update( req.fields ,{
            where: { id: req.fields.id }
        }).then(result => {
            if(result)
            return res.send({status: "OK", obj_save: result});
            else
            return res.send({status: "ERRO", obj_save: result});
        }).catch(err => {
            return res.send({error: err});
        });

    },




    /****************************/
    //
    //      MESSAGEROOM DELETE
    //
    /****************************/

    async delete(req, res){

        let objExcluir = await MessageRoom.findOne({where: {id: req.fields.id}}).catch(function(erro){
            return res.status(400).send({error: erro});
        });
        if(objExcluir.destroy())
        return res.send({status: "OK", obj: objExcluir});
        else
        return res.status(400).send({status: "ERRO", obj: objExcluir});
    }

}