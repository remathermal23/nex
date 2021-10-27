import DefaultImg from '../../public/assets/images/default_img.jpg'

export const REVALIDATE_TIME = 60
export const MAX_PRODUCT_CAROUSEL = 20
export const BLUR_DATA_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8fBIAApUBruKYvzsAAAAASUVORK5CYII='
export const DEFAULT_IMG = DefaultImg

export enum PaymentMethod {
  Braintree = 'braintree'
}

export const SOCIAL_LINKS = {
  FB: 'FB',
  TWITTER: 'TWITTER',
  YOUTUBE: 'YOUTUBE',
  IG: 'IG',
}

export const ROUTE = {
  HOME: '/',
  ABOUT: '/about',
  ACCOUNT: '/account',

  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/product',

  BLOGS: '/blogs',
  BLOG_DETAIL: '/blog',

  RECIPES: '/recipes',
  RECIPE_DETAIL: '/recipe',

  NOTIFICATION: '/notifications',
  BUSSINESS: '/bussiness',
  CONTACT: '/contact',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout-success',
  FAQ: '/faq',
  CUSTOMER_SERVICE: '/customer-service',
  TERM_CONDITION: '/term-condition',
  PRIVACY_POLICY: '/privacy-policy',
  FORGOT_PASSWORD: '/forgot-password'
}

export const ACCOUNT_TAB = {
  CUSTOMER_INFO: '',
  ORDER: 'orders',
  FAVOURITE: 'wishlist',
}

export const LOCAL_STORAGE_KEY = {
  TOKEN: 'token',
  VIEWEDPRODUCT: "viewed-product"
}

export const QUERY_SPLIT_SEPERATOR = ','
export const QUERY_KEY = {
  TAB: 'tab',
  CATEGORY: 'category',
  BRAND: 'brand',
  FEATURED: 'featured',
  SORTBY: 'sortby',
  RECIPES: 'recipes',
  PAGE: 'page',
  SEARCH:"search",
  ORDER_ID: 'o'
}

export const PRODUCT_SORT_OPTION_VALUE = {
  NAME_ASC: 'name_asc',
  NAME_DESC: 'name_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',

}

export enum ProductFeature {
  BestSellers = 'Best Sellers',
  Sales = 'Sales',
  NewItem = 'New Item',
  Viewed = 'Viewed',
}

export const KEY = {
  ENTER: 'Enter',
}

export const OPTION_ALL = 'all';
export const DEFAULT_PAGE_SIZE = 20;


export const CATEGORY = [
  {
    name: 'All',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=${OPTION_ALL}`,
  },
  {
    name: 'Veggie',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=veggie`,
  },
  {
    name: 'Seafood',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=seafood`,
  },
  {
    name: 'Frozen',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=frozen`,
  },
  {
    name: 'Coffee Bean',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=coffee_bean`,
  },
  {
    name: 'Sauce',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=sauce`,
  },
]

export const BRAND = [
  {
    name: 'Maggi',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=maggi`,
  },
  {
    name: 'Chomilex',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chomilex`,
  },
  {
    name: 'Chinsu',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.BRAND}=chinsu`,
  },
]

export const FACET = {
  FEATURE: {
    PARENT_NAME: 'Featured',
    FRESH: 'Fresh',
    BEST_SELLERS: 'Best seller'
  },
  CATEGORY:  {
    PARENT_CODE:"category",
    VEGGIE:"veggie",
    FROZEN:"frozen",
    SEAFOOD:"seafood",
    COFFEE_BEAN:"coffee-bean"
  }
}

export const CODE_FACET_FEATURED = 'featured'
export const CODE_FACET_DISCOUNT = 'discount'
export const CODE_FACET_BRAND = 'brand'
export const CODE_FACET_FEATURED_VARIANT = {
  FRESH: 'fresh',
}

export const OPTIONS_SORT_PRODUCT = [
  {
    name: 'By Name (A-Z)',
    value: PRODUCT_SORT_OPTION_VALUE.NAME_ASC,
  },
  {
    name: 'By Name (Z-A)',
    value: PRODUCT_SORT_OPTION_VALUE.NAME_DESC,
  },
  {
    name: 'Price (Low to High)',
    value: PRODUCT_SORT_OPTION_VALUE.PRICE_ASC,
  },
  {
    name: 'Price (High to Low)',
    value: PRODUCT_SORT_OPTION_VALUE.PRICE_DESC,
  },
];


export const FEATURED = [
  {
    name: 'Best Sellers',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=best_sellers`,
  },
  {
    name: 'Sales',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=sales`,
  },
  {
    name: 'New Item',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=new_item`,
  },
  {
    name: 'Viewed',
    link: `${ROUTE.PRODUCTS}/?${QUERY_KEY.FEATURED}=viewed`,
  },
]

export const DEFAULT_BLOG_PAGE_SIZE = 6;

export const DEFAULT_FEATURED_BLOG_PAGE_SIZE = 1;

export const FILTER_PAGE = [ROUTE.HOME, ROUTE.PRODUCTS]

export const STATE_OPTIONS = [
  {
    name: 'Hồ Chí Minh',
    value: 'Hồ Chí Minh',
  },
  {
    name: 'Hà Nội',
    value: 'Hà Nội',
  },
]

export const COLLECTION_SLUG_SPICE = "spice";