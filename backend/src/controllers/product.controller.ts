import { NextFunction, Request, Response } from "express";
import db from "../models";


export const getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const products = await db.Product.findAll();
        
        if (!products) return res.sendStatus(404)
        return res.status(200).json({
            message: "Productos encontrados satisfactoriamente",
            data: products
        })
    } catch (e: any) {
        res.status(500).json({
            message: "Ocurrió un error interno"
        })
        next(e);
    }
}

export const getProductById = async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const {id} = req.query;
    const product = await db.Product.findOne({
        where: {id:id}
    })
    if(product){
        return res.status(200).json({
            message:"Producto encontrado satisfactoriamente",
            data:product
        })
    }
}

export const createProduct =async (
    req: Request,
    res: Response,
    next: NextFunction
    
) => {
    const product = await db.Product.create({...req.body});
    return res.status(201).json({
        message:"Producto creado satisfactoriamente",
        data:product
    })    
}