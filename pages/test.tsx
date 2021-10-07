import commerce from '@lib/api/commerce';
import { GetStaticPropsContext } from 'next';
import { Layout, ListProductCardSkeleton } from 'src/components/common';

interface Props {
  products: any
}
export default function Home({ products }: Props) {
  return (
    <>
      {/* <ListProductCardSkeleton /> */}
      {/* <ListProductCardSkeleton count={1} /> */}
      <ListProductCardSkeleton count={10} />
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab qui magnam debitis ex laborum laboriosam suscipit! Totam excepturi eum libero.
      <ListProductCardSkeleton count={10} isWrap/>
    </>
  )
}


export async function getServerSideProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {

  return {
    props: {},
  }
}


Home.Layout = Layout
