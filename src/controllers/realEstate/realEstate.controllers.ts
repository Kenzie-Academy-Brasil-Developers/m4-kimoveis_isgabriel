import { Request, Response } from "express";
import {
    TCreateRealEstate,
    TReturnCreateRealEstate,
} from "../../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../../services/realEstate/createRealEstate.service";
import { getAllRealEstatesService } from "../../services/realEstate/getAllRealRestates.service";

const createRealEstateController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const realEstateData: TCreateRealEstate = req.body;
    const newRealEstate: TReturnCreateRealEstate =
        await createRealEstateService(realEstateData);

    return res.status(201).json(newRealEstate);
};

const getAllRealEstatesController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const getAllRealEstates = await getAllRealEstatesService();

    return res.status(200).json(getAllRealEstates);
};
export { createRealEstateController, getAllRealEstatesController };
