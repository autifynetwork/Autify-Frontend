import { gql } from '@apollo/client';

export const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
        checkEmail(email: $email)
    }
`;

export const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategoryInput($categoryName: String!, $status: Boolean!) {
        createCategory(categoryName: $categoryName, status: $status) {
            id
            categoryName
        }
    }
`;

export const GET_ALL_CATEGORIES = gql`
    query {
        getAllCategories {
            id
            categoryName
            status
        }
    }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
    mutation UpdateCategory($status: Boolean, $categoryName: String, $categoryId: String!) {
        updateCategory(status: $status, categoryName: $categoryName, categoryId: $categoryId) {
            id
            categoryName
            status
        }
    }
`;

export const DELETE_CATEGORY_MUTATION = gql`
    mutation DeleteCategory($categoryId: String!) {
        deleteCategory(categoryId: $categoryId) {
            id
            categoryName
            status
        }
    }
`;

export const CREATE_SUBCATEGORY_MUTATION = gql`
    mutation CreateSubCategory($status: Boolean, $categoryId: String!, $subCategoryName: String!) {
        createSubCategory(status: $status, categoryId: $categoryId, subCategoryName: $subCategoryName) {
            id
            subCategoryName
            categoryId
            status
        }
    }
`;

export const GET_ALL_SUBCATEGORIES = gql`
    query {
        getAllSubCategories {
            id
            subCategoryName
            categoryId
            status
            mainCategory {
                id
                categoryName
                status
            }
        }
    }
`;

export const UPDATE_SUBCATEGORY_MUTATION = gql`
    mutation ($status: Boolean, $categoryId: String, $subCategoryName: String, $subCategoryId: String!) {
        updateSubCategory(
            status: $status
            categoryId: $categoryId
            subCategoryName: $subCategoryName
            subCategoryId: $subCategoryId
        ) {
            id
            subCategoryName
            categoryId
            status
            mainCategory {
                id
                categoryName
                status
            }
        }
    }
`;

export const DELETE_SUBCATEGORY_MUTATION = gql`
    mutation ($subCategoryId: String!) {
        deleteSubCategory(subCategoryId: $subCategoryId) {
            id
            subCategoryName
            categoryId
            status
            mainCategory {
                id
                categoryName
                status
            }
        }
    }
`;

export const CREATE_PRODUCTATTRIBUTE_MUTATION = gql`
    mutation CreateProductAttribute($attributeCategoryId: String!, $status: Boolean, $attributeName: String!) {
        createProductAttribute(
            attributeCategoryId: $attributeCategoryId
            status: $status
            attributeName: $attributeName
        ) {
            attributeName
            status
            attributeCategoryId
        }
    }
`;

export const GET_ALL_PRODUCTATTRIBUTES = gql`
    query ProductAttributes {
        productAttributes {
            attributeName
            status
            attributeCategoryId
            attributeCategory {
                id
                categoryName
                status
            }
        }
    }
`;

export const CREATE_PRODUCTSKU_MUTATION = gql`
    mutation CreateProductSKU($SKUCategoryId: String!, $status: Boolean, $productsku: String!) {
        createProductSKU(SKUCategoryId: $SKUCategoryId, status: $status, productsku: $productsku) {
            productsku
            status
            SKUCategoryId
        }
    }
`;

export const GET_ALL_PRODUCTSKUS = gql`
    query GetAllProductSKU {
        getAllProductSKU {
            productsku
            status
            SKUCategoryId
            SKUCategory {
                id
                categoryName
                status
            }
        }
    }
`;
