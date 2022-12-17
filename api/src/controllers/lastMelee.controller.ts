import lastMeleeModel from "../db/models/lastMelee.model";

export async function getLastMelee(req:any, res:any) {
    let id = req.params.id;
    let data = await lastMeleeModel.findOne({ login: id });

    if(!data) {
        return res.send({
            code: 404,
            error: "This user doesn't exist",
        });
    };

    return res.send(data.melee);
}