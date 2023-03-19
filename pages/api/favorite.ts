import { NextApiRequest, NextApiResponse } from "next";
import { without} from 'lodash';

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === 'POST'){
            const {currentUser} = await serverAuth(req);

            const {movieId} = req.body;

            const movie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if(!movie){
                throw new Error("Invalid id");
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: {
                        push: movieId
                    }
                }
            });

            return res.status(200).json(user);
        }

        if(req.method === 'DELETE'){
            const {currentUser} = await serverAuth(req);

            const {movieId} = req.body;

            const movie = await prismadb.movie.findUnique({
                where: {
                    id: movieId
                }
            });

            if(!movie){
                throw new Error("Invalid id");
            }

            const updatedFavs = without(currentUser.favoriteIds, movieId);

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: updatedFavs
                }
            });
            
            return res.status(200).json(user);
        }
        return res.status(405).end();
        
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}