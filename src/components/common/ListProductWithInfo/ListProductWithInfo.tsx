import classNames from 'classnames';
import { TOptionsEvents } from 'keen-slider';
import React from 'react';
import CarouselCommon from '../CarouselCommon/CarouselCommon';
import ProductCard, { ProductCardProps } from '../ProductCard/ProductCard';
import InfoProducts from './InfoProducts/InfoProducts';
import s from './ListProductWithInfo.module.scss';

interface Props {
    data: ProductCardProps[],
    title: string,
    subtitle?: string,
    hasBorderBottomMobile?: boolean,
}
const OPTION_DEFAULT: TOptionsEvents = {
    slidesPerView: 2,
    mode: 'free',
    breakpoints: {
        '(min-width: 640px)': {
            slidesPerView: 3,
        },
        '(min-width: 768px)': {
            slidesPerView: 3,
        },
        '(min-width: 1008px)': {
            slidesPerView: 3.5,
        },
        '(min-width: 1024px)': {
            slidesPerView: 2.5,
        },
        '(min-width: 1280px)': {
            slidesPerView: 3.5,
        },
        '(min-width: 1440px)': {
            slidesPerView: 4.5,
        },
    },
}

const ListProductWithInfo = ({ data, title, subtitle, hasBorderBottomMobile }: Props) => {
    return (
        <div className={classNames({
            [s.listProductWithInfo]: true,
            [s.borderBottom]: hasBorderBottomMobile,
        })}>
            <InfoProducts
                title={title}
                subtitle={subtitle}
            />
            <div className={s.productsWrap}>
                <CarouselCommon<ProductCardProps>
                    data={data}
                    Component={ProductCard}
                    itemKey={title}
                    option={OPTION_DEFAULT}
                />
            </div>
        </div>
    );
};

export default ListProductWithInfo;