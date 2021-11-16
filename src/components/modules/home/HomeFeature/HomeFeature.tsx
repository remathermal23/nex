import React from 'react'
import s from './HomeFeature.module.scss'

import FirstPic from './assets/10h30-11h.png'
import SecondPic from './assets/8h.png'
import ThirdPic from './assets/green.png'

import HomeFeatureCarousel from './components/HomeFeatureCarousel/HomeFeatureCarousel'
import { HomeFeatureItemProps } from './components/HomeFeatureItem/HomeFeatureItem'

const CAROUSEL_DATA = [
    {
        image: FirstPic,
        children: <span>Webshop owner will <b>upload products at 10:30pm </b>shoppers can buy <b>fresh products at 11pm.</b></span>,
    },
    {
        image: SecondPic,
        children: <span>Most fresh fish and seafood <b>will be listed at 8am </b>from inventory.</span>,
    },
    {
        image: ThirdPic,
        children: <span>Show that food will be shipped in <b>a greengrocery plastic bag</b>.</span>,
    },
]
interface Props {
    features: HomeFeatureItemProps[]
}

const HomeFeature = ({ features }: Props) => {

    return (
        <div className={s.homeFeature}>
            <HomeFeatureCarousel data={features || CAROUSEL_DATA} itemKey="Home Feature" />
        </div>
    )

}

export default HomeFeature