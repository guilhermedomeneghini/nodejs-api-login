import express from 'express';
//import { PrismaClient } from '../nodejs e react/generated/prisma/index.js';
import { PrismaClient } from '@prisma/client';

//import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient();


const app = express();
app.use(express.json());// serve para avisar que vai chegar algo no formato json, pois por padrao exprress nao trabalha em json



app.post('/usuarios', async(req, res)=>{
    
    await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,

        }
    })

    res.status(201).json(req.body) //201 > mostra o usuario e da o ok 201(Aviso de created)
})


//ROTA PARA LISTAR USUARIOS
app.get('/usuarios', async (req, res) =>{
    let users=[];

    if(req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email,
            }
        })
    } else{
        users = await prisma.user.findMany() //findmany todos os usuarios
    }
    console.log(req)

    
    res.status(200).json(users) // LISTA ALGO NO BODY DO SITE... VINDO EM JSON
})

//ROTA PARA EDITAR USUARIO

app.put('/usuarios/:id', async(req, res)=>{
    
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,

        }
    });

    res.status(201).json(req.body)
});

//ROTA PARA DELETAR USUARIO
app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where:{
            id: req.params.id
        }
    });
    res.status(200).json({message: "Usuario deletado com sucesso!"})
})


//INICIAR SERVIDOR NA PORTA 3000

app.listen(3000)













/* 
    Criar nossa API usarios
    - Criar um usuario
    - Listar todos os usuarios
    - Editar um usuario
    - Deletar um usuario
    
    user: guilherme
    pwd: sJV8siNIiOFdytvQ

*/
