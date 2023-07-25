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
