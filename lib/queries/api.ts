import { gql } from '@apollo/client';

export const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
        checkEmail(email: $email)
    }
`;

export const GET_PROFILE_EMAIL = gql`
    query GetProfileEmail($email: String!) {
        getProfileEmail(email: $email) {
            id
            email
            firstName
            lastName
        }
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

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct(
        $cartificate: String
        $specialFeature: String
        $sku: String
        $attributes: String
        $manfactDetail: String
        $location: String
        $materialUsed: String
        $unit: Float
        $expiryDate: String
        $productDesc: String
        $status: Boolean
        $productName: String!
    ) {
        createProduct(
            cartificate: $cartificate
            specialFeature: $specialFeature
            sku: $sku
            attributes: $attributes
            manfactDetail: $manfactDetail
            location: $location
            materialUsed: $materialUsed
            unit: $unit
            expiryDate: $expiryDate
            productDesc: $productDesc
            status: $status
            productName: $productName
        ) {
            id
            productName
            status
            productDesc
            expiryDate
            unit
            materialUsed
            location
            manfactDetail
            attributes
            sku
            specialFeature
            cartificate
        }
    }
`;

export const GET_ALL_PRODUCTS = gql`
    query productList {
        productList {
            id
            productName
            status
            productDesc
            expiryDate
            unit
            materialUsed
            location
            manfactDetail
            attributes
            sku
            specialFeature
            cartificate
        }
    }
`;

export const GET_PRODUCT_BY_ID = gql`
    query ProductById($productId: String!) {
        productById(productId: $productId) {
            id
            productName
            status
            productDesc
            expiryDate
            unit
            materialUsed
            location
            manfactDetail
            attributes
            sku
            specialFeature
            cartificate
        }
    }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
    mutation UpdateProduct(
        $productId: String!
        $cartificate: String
        $specialFeature: String
        $sku: String
        $attributes: String
        $manfactDetail: String
        $location: String
        $materialUsed: String
        $unit: Float
        $expiryDate: String
        $productDesc: String
        $status: Boolean
        $productName: String!
    ) {
        updateProduct(
            productId: $productId
            cartificate: $cartificate
            specialFeature: $specialFeature
            sku: $sku
            attributes: $attributes
            manfactDetail: $manfactDetail
            location: $location
            materialUsed: $materialUsed
            unit: $unit
            expiryDate: $expiryDate
            productDesc: $productDesc
            status: $status
            productName: $productName
        ) {
            id
            productName
            status
            productDesc
            expiryDate
            unit
            materialUsed
            location
            manfactDetail
            attributes
            sku
            specialFeature
            cartificate
        }
    }
`;

export const DELETE_PRODUCT_MUTATION = gql`
    mutation DeleteProduct($productId: String!) {
        deleteProduct(productId: $productId) {
            id
            productName
            status
            productDesc
            expiryDate
            unit
            materialUsed
            location
            manfactDetail
            attributes
            sku
            specialFeature
            cartificate
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

export const POPULATE_PROFILE = gql`
    mutation PopulateProfile(
        $bEmail: String
        $bName: String
        $phone: String
        $lastName: String!
        $firstName: String!
        $email: String!
    ) {
        populateProfile(
            bEmail: $bEmail
            bName: $bName
            phone: $phone
            lastName: $lastName
            firstName: $firstName
            email: $email
        ) {
            id
            firstName
            lastName
            email
            phone
            bName
            bEmail
        }
    }
`;

export const CREATE_VENDOR_MUTATION = gql`
    mutation PopulateVendor(
        $brandId: String!
        $password: String!
        $userName: String!
        $AdditionalInfo: String
        $vendorTaxDetails: String
        $vendorEntityName: String
        $whiteList: Boolean
        $contract: String
        $vendorPhone: String!
        $vendorName: String!
    ) {
        populateVendor(
            brandId: $brandId
            password: $password
            userName: $userName
            AdditionalInfo: $AdditionalInfo
            vendorTaxDetails: $vendorTaxDetails
            vendorEntityName: $vendorEntityName
            whiteList: $whiteList
            contract: $contract
            vendorPhone: $vendorPhone
            vendorName: $vendorName
        ) {
            id
            brandId
            password
            userName
            AdditionalInfo
            vendorTaxDetails
            vendorEntityName
            whitelist
            contract
            vendorPhone
            vendorName
        }
    }
`;

export const GET_ALL_VENDORS = gql`
    query getAllVendors {
        getAllVendors {
            id
            brandId
            userName
            AdditionalInfo
            vendorTaxDetails
            vendorEntityName
            whitelist
            contract
            vendorPhone
            vendorName
        }
    }
`;

export const GET_VENDOR_BY_ID = gql`
    query VendorById($vendorId: String!) {
        getVendor(vendorId: $vendorId) {
            id
            brandId
            userName
            AdditionalInfo
            vendorTaxDetails
            vendorEntityName
            whitelist
            contract
            vendorPhone
            vendorName
            billOfMat
        }
    }
`;

export const UPDATE_VENDOR_MUTATION = gql`
    mutation UpdateVendor(
        $vendorId: String!
        $brandId: String!
        $userName: String!
        $AdditionalInfo: String
        $vendorTaxDetails: String
        $vendorEntityName: String
        $whiteList: Boolean
        $contract: String
        $vendorPhone: String!
        $vendorName: String!
    ) {
        updateVendor(
            id: $vendorId
            brandId: $brandId
            userName: $userName
            AdditionalInfo: $AdditionalInfo
            vendorTaxDetails: $vendorTaxDetails
            vendorEntityName: $vendorEntityName
            whiteList: $whiteList
            contract: $contract
            vendorPhone: $vendorPhone
            vendorName: $vendorName
        ) {
            id
            brandId
            userName
            AdditionalInfo
            vendorTaxDetails
            vendorEntityName
            whiteList
            contract
            vendorPhone
            vendorName
            billOfMat
        }
    }
`;

export const DELETE_VENDOR_MUTATION = gql`
    mutation DeleteVendor($vendorId: String!) {
        deleteVendor(vendorId: $vendorId) {
            id
            brandId
            userName
            AdditionalInfo
            vendorTaxDetails
            vendorEntityName
            whiteList
            contract
            vendorPhone
            vendorName
            billOfMat
        }
    }
`;

export const CREATE_BOM_MUTATION = gql`
    mutation PopulateBom(
        $remarks: String
        $instructions: String
        $dueDate: DateTime
        $vendorId: String!
        $description: String
        $title: String!
    ) {
        populateBom(
            remarks: $remarks
            instructions: $instructions
            dueDate: $dueDate
            vendorId: $vendorId
            description: $description
            title: $title
        ) {
            id
            remarks
            instructions
            dueDate
            vendorId
            description
            title
        }
    }
`;
