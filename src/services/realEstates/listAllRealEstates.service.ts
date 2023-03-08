import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { TReturnAllRealEstates } from "../../interfaces/realEstate.interface";
import { returnAllRealEstatesSchema } from "../../schemas/realEstate.schema";

export const listAllRealEstatesService = async (): Promise<TReturnAllRealEstates> => {
    const realEstateRepository = AppDataSource.getRepository(RealEstate);

    const realEstates = await realEstateRepository.find({
        relations: {
            address: true,
            category: true
        }
    });

    const realEstatesFormatted = realEstates.map((element, index) => {
        if (!element.category) {
            delete realEstates[index].category;
        }
        return element;
    });

    return returnAllRealEstatesSchema.parse(realEstatesFormatted);
};