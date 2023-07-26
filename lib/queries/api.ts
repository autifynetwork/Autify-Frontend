import { gql } from '@apollo/client';

export const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
        checkEmail(email: $email)
    }
`;

export const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategoryInput($categoryName: String!, $categoryImgUrl: String!, $status: Boolean!) {
        createCategory(categoryName: $categoryName, categoryImgUrl: $categoryImgUrl, status: $status) {
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
            categoryImgUrl
            status
        }
    }
`;

export const UPDATE_CATEGORY_MUTATION = gql`
    mutation UpdateCategory($status: Boolean, $categoryImgUrl: String, $categoryName: String, $categoryId: String!) {
        updateCategory(
            status: $status
            categoryImgUrl: $categoryImgUrl
            categoryName: $categoryName
            categoryId: $categoryId
        ) {
            id
            categoryName
            categoryImgUrl
            status
        }
    }
`;

export const DELETE_CATEGORY_MUTATION = gql`
    mutation DeleteCategory($categoryId: String!) {
        deleteCategory(categoryId: $categoryId) {
            id
            categoryName
            categoryImgUrl
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
                categoryImgUrl
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
                categoryImgUrl
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
                categoryImgUrl
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
            ID
            productName
            status
            attributeCategoryId
        }
    }
`;

export const GET_ALL_PRODUCTATTRIBUTES = gql`
    query ProductAttributes {
        productAttributes {
            ID
            productName
            status
            attributeCategoryId
            attributeCategory {
                id
                categoryName
                categoryImgUrl
                status
            }
        }
    }
`;
