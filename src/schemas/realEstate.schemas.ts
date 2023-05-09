import { z, union } from "zod";
import { addressSchema, createAddressSchema } from "./addresses.schemas";
import { categorySchema } from "./category.schemas";

const realEstateSchema = z.object({
    id: z.number().positive().int(),
    sold: z.boolean().default(false),
    value: union([
        z
            .string()
            .min(0)
            .max(9999999999.99)
            .transform((val) => parseFloat(val).toFixed(2)),
        z
            .number()
            .min(0)
            .max(9999999999.99)
            .transform((val) => val.toFixed(2)),
    ]),
    size: z.number().int().positive(),
    createdAt: z.string(),
    updatedAt: z.string(),
    address: addressSchema,
    category: categorySchema,
});

const createRealEstateSchema = realEstateSchema
    .omit({
        id: true,
        address: true,
        category: true,
        createdAt: true,
        updatedAt: true,
    })
    .extend({
        address: createAddressSchema,
        categoryId: z.number(),
    });

const returnRealEstateSchema = realEstateSchema;

const returnAllRealEstateSchema = returnRealEstateSchema.array();

export {
    realEstateSchema,
    createRealEstateSchema,
    returnRealEstateSchema,
    returnAllRealEstateSchema,
};
