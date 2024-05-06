import { getCollection, getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumb from 'components/breadcrumb';
import BreadcrumbHome from 'components/breadcrumb/breadcrumb-home';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import Filters from 'components/layout/search/filters';
import SortingMenu from 'components/layout/search/sorting-menu';
import { defaultSort, sorting } from 'lib/constants';
import { Suspense } from 'react';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const productsData = getCollectionProducts({ collection: params.collection, sortKey, reverse });
  const collectionData = getCollection(params.collection);

  const [products, collection] = await Promise.all([productsData, collectionData]);

  return (
    <>
      <div className="mb-2">
        <Suspense fallback={<BreadcrumbHome />}>
          <Breadcrumb type="collection" handle={params.collection} />
        </Suspense>
      </div>
      {collection ? (
        <div className="mb-1 mt-3 max-w-5xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{collection.title}</h1>
          <p className="mt-2 text-base text-gray-500">{collection.description}</p>
        </div>
      ) : null}
      <div className="flex w-full justify-end">
        <SortingMenu />
      </div>
      <section className="mt-3 border-t pt-2">
        {products.length === 0 ? (
          <p className="py-3 text-lg">{`No products found in this collection`}</p>
        ) : (
          <Grid className="pt-5 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside className="hidden lg:block">
              <Filters collection={params.collection} />
            </aside>
            <div className="lg:col-span-2 xl:col-span-3">
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ProductGridItems products={products} />
              </Grid>
            </div>
          </Grid>
        )}
      </section>
    </>
  );
}
