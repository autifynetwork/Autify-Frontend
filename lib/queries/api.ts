import { gql } from '@apollo/client';

export const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

