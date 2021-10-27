import React from 'react'
import {
  CollectionHeading,
  ProductCarousel,
  ViewAllItem,
} from 'src/components/common'
import { CollectionHeadingProps } from 'src/components/common/CollectionHeading/CollectionHeading'
import { ProductCardProps } from 'src/components/common/ProductCard/ProductCard'
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import s from './CollectionCarcousel.module.scss'
interface ColectionCarcouselProps extends CollectionHeadingProps {
  data: ProductCardProps[]
  itemKey: string
  viewAllLink?: string,
  category?: string
}

const ColectionCarcousel = ({
  data,
  itemKey,
  title,
  subtitle,
  type,
  category,
  viewAllLink = ROUTE.PRODUCTS,
}: ColectionCarcouselProps) => {
  return (
    <div className={s.colectionCarcoucelWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <CollectionHeading
            type={type}
            subtitle={subtitle}
            title={title}
          ></CollectionHeading>
        </div>
        <div className={s.right}>
          <ViewAllItem link={category ? `${ROUTE.PRODUCTS}/?${QUERY_KEY.CATEGORY}=${category}` : viewAllLink} />
        </div>
      </div>
      <div className={s.bot}>
        <ProductCarousel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default ColectionCarcousel