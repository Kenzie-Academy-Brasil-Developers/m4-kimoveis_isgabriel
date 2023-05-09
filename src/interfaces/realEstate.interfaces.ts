import { z } from "zod";
import {
    createRealEstateSchema,
    realEstateSchema,
    returnAllRealEstateSchema,
    returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

type TRealEstate = z.infer<typeof realEstateSchema>;
type TCreateRealEstate = z.infer<typeof createRealEstateSchema>;
type TReturnCreateRealEstate = z.infer<typeof returnRealEstateSchema>;
type TReturnAllRealEstates = z.infer<typeof returnAllRealEstateSchema>;

export {
    TRealEstate,
    TCreateRealEstate,
    TReturnCreateRealEstate,
    TReturnAllRealEstates,
};
