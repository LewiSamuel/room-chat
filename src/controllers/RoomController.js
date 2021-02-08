// - - - - - - - - - - - - - - - - - -
//         IMPORT MODULES
//
const Room = require("../models/RoomModel");
const crypto = require("crypto");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {



    /****************************/
    //
    //      ROOM LIST
    //
    /****************************/

    async list(req, res){ 
        
        await Room.find(req.fields).then(async result => {

            //console.log(result)

            return res.send(result);
        }).catch(err => {
            return res.send({error: err});
        })
    },




    /****************************/
    //
    //      ROOM LISTONE
    //
    /****************************/

    async listOne(req, res){
        await Room.findOne({
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
    //      ROOM SAVE
    //
    /****************************/
    async save(req, res){   
        
        // save
            await Room.create( req.fields ).then( async result => {
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
    //      ROOM UPDATE
    //
    /****************************/
    async update(req, res){
        
        await Room.update( req.fields ,{
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
    //      ROOM DELETE
    //
    /****************************/

    async delete(req, res){

        let objExcluir = await Room.findOne({where: {id: req.fields.id}}).catch(function(erro){
            return res.status(400).send({error: erro});
        });
        if(objExcluir.destroy())
        return res.send({status: "OK", obj: objExcluir});
        else
        return res.status(400).send({status: "ERRO", obj: objExcluir});
    }

}