import { Collection } from '@commerce/types/collection';
import { ProductCard } from '@commerce/types/product';
import { ProductVariables } from '@framework/api/operations/get-all-products';
import { FacetValue } from '@framework/schema';
import { SortOrder } from 'src/utils/types.utils';
import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout } from 'src/components/common';
import { BannerItemProps } from 'src/components/common/Banner/BannerItem/BannerItem';
import { FeaturedProductsCarousel, FreshProducts, HomeBanner, HomeCategories, HomeCollection, HomeCTA, HomeFeature, HomeRecipe, HomeSubscribe, HomeVideo } from 'src/components/modules/home';
import { HomeFeatureItemProps } from 'src/components/modules/home/HomeFeature/components/HomeFeatureItem/HomeFeatureItem';
import HomeSpice from 'src/components/modules/home/HomeSpice/HomeSpice';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED, COLLECTION_SLUG_SPICE, MAX_COLLECTIONS_IN_HOME, REVALIDATE_TIME } from 'src/utils/constanst.utils';
import { checkIsRecipeInCollectionsEmpty, FilterOneVatiant, getAllFacetValueIdsByParentCode, getAllFacetValuesForFeatuedProducts, getAllPromies, getFreshFacetId } from 'src/utils/funtion.utils';
import { CollectionsWithData, DataHomeProps, PageName, PromiseWithKey } from 'src/utils/types.utils';


interface Props {
  featuredAndDiscountFacetsValue: FacetValue[],
  freshProducts: ProductCard[],
  featuredProducts: ProductCard[],
  collections: Collection[]
  spiceProducts:ProductCard[]
  collectionProps:CollectionsWithData[]
  recipesCollection:any[],
  dataHome:DataHomeProps,
  features:HomeFeatureItemProps[],
  banners:BannerItemProps[]
}
export default function Home({ featuredAndDiscountFacetsValue, collectionProps,
  freshProducts, featuredProducts,recipesCollection,
  collections, spiceProducts,dataHome,features,banners }: Props) {
  
  return (
    <>
      <HomeBanner banners={banners}
      bannerLeftTitle={dataHome?.bannerLeftTitle ?? ''} 
      imageSrcBannerLeft={dataHome?.imageSrcBannerLeft ?? ''} 
      />
      <HomeFeature features={features} />
      <HomeCategories />
      <FreshProducts data={freshProducts} collections={collections} />
      <HomeCollection data={collectionProps} />
      <HomeVideo data={dataHome} />
      {spiceProducts?.length > 0 && <HomeSpice data={spiceProducts} />}
      {
        featuredProducts?.length > 0 &&
        <FeaturedProductsCarousel data={featuredProducts} featuredFacetsValue={featuredAndDiscountFacetsValue} />
      }
      <HomeCTA />
      {!checkIsRecipeInCollectionsEmpty(recipesCollection) && <HomeRecipe recipesCollection={recipesCollection} />}

      <HomeSubscribe />
    </>
  )
}


export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  let promisesWithKey = [] as PromiseWithKey[]
  let props = {} as any

  const { facets } = await commerce.getAllFacets({
    variables: {},
    config,
    preview,
  })

  props.featuredAndDiscountFacetsValue = getAllFacetValuesForFeatuedProducts(facets)

  // collection
  const { collections } = await commerce.getAllCollections({
    variables: {},
    config,
    preview,
  })

  props.collections = collections
  let collectionsPromisesWithKey = [] as PromiseWithKey[]
  collections.slice(0, MAX_COLLECTIONS_IN_HOME).map((collection) => {
    const promise = commerce.getAllProducts({
      variables: { collectionSlug: collection.slug },
      config,
      preview,
    })
    collectionsPromisesWithKey.push({ key: `${collection.slug}`, promise: promise, keyResult: 'products' })
  })
  // fresh products
  const freshProductvariables: ProductVariables = {}
  const freshFacetId = getFreshFacetId(facets)
  if (freshFacetId) {
    freshProductvariables.facetValueIds = [freshFacetId]
    const freshProductsPromise = commerce.getAllProducts({
      variables: freshProductvariables,
      config,
      preview,
    })
    promisesWithKey.push({ key: 'freshProducts', promise: freshProductsPromise, keyResult: 'products' })
  } else {
    props.freshProducts = []
  }

  // featured products
  const allFeaturedFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_FEATURED)
  const allDiscountFacetIds = getAllFacetValueIdsByParentCode(facets, CODE_FACET_DISCOUNT)
  const facetValueIdsForFeaturedProducts = [...allFeaturedFacetIds, ...allDiscountFacetIds]

  if (facetValueIdsForFeaturedProducts?.length > 0) {
    const featuredProductsPromise = commerce.getAllProducts({
      variables: {
        facetValueIds: facetValueIdsForFeaturedProducts
      },
      config,
      preview,
    })
    promisesWithKey.push({ key: 'featuredProducts', promise: featuredProductsPromise, keyResult: 'products' })
  } else {
    props.featuredProducts = []
  }

  // spiceProducts
  const spiceProducts = commerce.getAllProducts({
    variables: {
      collectionSlug: COLLECTION_SLUG_SPICE,
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'spiceProducts', promise: spiceProducts, keyResult: 'products' })
  
  //page home

  const dataHome =  commerce.getHome({
    variables: {
    },
    config,
    preview,
  })
  promisesWithKey.push({ key: 'dataHome', promise: dataHome })


  // recipe 
  const recipesCollection = await commerce.getAllRecipeCollections({ variables: { first: 3 } })
  props.recipesCollection = recipesCollection.recipeCollections

  // banner
  const homeBannersPromise = commerce.getBannersByPage({ 
    variables: {
       page: PageName.HOME, options:{sort: {order: SortOrder.Asc}} 
      }
    }
  )
  promisesWithKey.push({ key: 'banners', promise: homeBannersPromise })

  // Feature
  const homeFeaturePromise =  commerce.getHomeFeature({ variables: {options:{sort: {order: SortOrder.Asc}} } })
  promisesWithKey.push({ key: 'features', promise: homeFeaturePromise })


  try {
    const collectionPromises = getAllPromies(collectionsPromisesWithKey)
    const collectionResult = await Promise.all(collectionPromises)
    let collectionProps: CollectionsWithData[] = []
    collectionsPromisesWithKey.map((item, index) => {
      collectionProps.push({
        ...collections[index],
        items: item.keyResult ? FilterOneVatiant(collectionResult[index][item.keyResult]) : collectionResult[index]
      })
      return null
    })
    props.collectionProps = collectionProps
    const promises = getAllPromies(promisesWithKey)
    const rs = await Promise.all(promises)

    promisesWithKey.map((item, index) => {
      props[item.key] = item.keyResult ? rs[index][item.keyResult] : rs[index]
      return null
    })
  
    return {
      props,
      revalidate: REVALIDATE_TIME,
    }
  } catch (err: any) {
    return {
      props: { error: err.message }
    }

  }
}


Home.Layout = Layout
