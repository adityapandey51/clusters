import cluster from "cluster";
import os from "os"
import dotenv from "dotenv"
import express from "express"
dotenv.config()


const totalCpus: number=os.cpus().length


if(cluster.isPrimary){
    for(let i=0;i<totalCpus;i++){
        cluster.fork()
    }
}else{
    const app=express();

    app.get("/",(req: any,res: any)=>{
        res.json({message:`hello world ${process.pid}`})
    })
    app.listen(process.env.PORT,()=>{
        console.log(`server started on port ${process.env.PORT}`)
    })
}