import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { TCategory, TReturnCategory } from "../../interfaces/categories.interface";
import { categorySchema } from "../../schemas/categories.schema";

export const createCategoryService = async (categoryData: TCategory): Promise<TReturnCategory> => {
    const categoryRepository = AppDataSource.getRepository(Category);

    const ensureCategoryExists = await categoryRepository.findOneBy({
        name: categoryData.name
    });

    if (ensureCategoryExists) {
        throw new AppError("Category already exists", 409);
    }

    const newCategory = categoryRepository.create(categoryData);

    await categoryRepository.save(newCategory);

    return categorySchema.parse(newCategory);
};