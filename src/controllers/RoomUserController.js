// - - - - - - - - - - - - - - - - - -
//         IMPORT MODULES
//
const RoomUser = require("../models/RoomUserModel");
const crypto = require("crypto");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Room = require("../models/RoomModel");

module.exports = {



    /****************************/
    //
    //      ROOMUSER LIST
    //
    /****************************/

    async list(req, res){ 
        
        await RoomUser.find(req.fields).then(async result => {


            // ANALIZING ALL REGISTERS
            for (let i = 0; i < result.length; i++){
                var element = result[i].dataValues;
                
                // ADD RELATION
                
                    var objidRoom = await Room.findOne({
                        where: { id: element.idRoom }
                    });
                    result[i].dataValues.idRoom = objidRoom.dataValues;
                    
            }

            return res.send(result);
        }).catch(err => {
            return res.send({error: err});
        })
    },




    /****************************/
    //
    //      ROOMUSER LISTONE
    //
    /****************************/

    async listOne(req, res){
        await RoomUser.findOne({
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
    //      ROOMUSER SAVE
    //
    /****************************/
    async save(req, res){   
        
        // save
            await RoomUser.create( req.fields ).then( async result => {
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
    //      ROOMUSER UPDATE
    //
    /****************************/
    async update(req, res){
        
        await RoomUser.update( req.fields ,{
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
    //      ROOMUSER DELETE
    //
    /****************************/

    async delete(req, res){

        let objExcluir = await RoomUser.findOne({where: {id: req.fields.id}}).catch(function(erro){
            return res.status(400).send({error: erro});
        });
        if(objExcluir.destroy())
        return res.send({status: "OK", obj: objExcluir});
        else
        return res.status(400).send({status: "ERRO", obj: objExcluir});
    }

}