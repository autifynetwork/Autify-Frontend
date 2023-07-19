import { gql } from '@apollo/client';

export const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
        checkEmail(email: $email)
    }
`;

export const CREATE_CATEGORY_MUTATION = gql`
    mutation CreateCategoryInput($categoryName: String!, $categoryImgUrl: String!, $status: Boolean!) {
        createCategory(categoryName: $categoryName, categoryImgUrl: $categoryImgUrl, status: $status) {
            id,
            categoryName
        }
    }
`;
