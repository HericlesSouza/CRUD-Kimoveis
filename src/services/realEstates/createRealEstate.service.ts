import { AppDataSource } from "../../data-source";
import { TCreateRealEstate } from "../../interfaces/realEstate.interface";
import { RealEstate, Address, Category } from "../../entities";
import { AppError } from "../../errors";
import { realEstateSchema } from "../../schemas/realEstate.schema";

export const createRealEstateService = async (realEstateData: TCreateRealEstate) => {
    const realEstateRepository = AppDataSource.getRepository(RealEstate);
    const addressRepository = AppDataSource.getRepository(Address);
    const categoryRepository = AppDataSource.getRepository(Category);

    let category = null;

    if (realEstateData.categoryId) {
        const ensureCategoryExists = await categoryRepository.findOneBy({ id: realEstateData.categoryId });

        if (!ensureCategoryExists) {
            throw new AppError("Category not found", 409);
        }

        category = ensureCategoryExists;
    }

    const ensureAddressDoesntExist = await addressRepository.findOne({
        where: {
            state: realEstateData.address.state,
            street: realEstateData.address.street,
            zipCode: realEstateData.address.zipCode
        }
    });

    if (ensureAddressDoesntExist) {
        throw new AppError("Address already exists", 409);
    }

    const newAddress = addressRepository.create(realEstateData.address);
    const createNewAddress = await addressRepository.save(newAddress);

    const newRealEstateData = {
        ...realEstateData,
        address: createNewAddress,
        category: category
    };

    const newRealEstate = realEstateRepository.create(newRealEstateData);
    await realEstateRepository.save(newRealEstate);
    
    return realEstateSchema.parse(newRealEstate);
};
