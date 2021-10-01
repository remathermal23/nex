import React, { useState } from 'react'
import {  HeadingCommon, ViewAllItem } from 'src/components/common'
import { RecipeCardProps } from 'src/components/common/RecipeCard/RecipeCard'
import RecipeCarousel from 'src/components/common/RecipeCarousel/RecipeCarousel'
import s from './HomeRecipe.module.scss'
import classNames from 'classnames';
import image13 from "../../../../../public/assets/images/image13.png"
import image14 from "../../../../../public/assets/images/image14.png"
import image12 from "../../../../../public/assets/images/image12.png"
import HomeRecipeTab from './HomeRecipeTab/HomeRecipeTab'

interface HomeRecipeProps {
  data?: RecipeCardProps[]
  itemKey?: string
  title?: string
  viewAllLink?: string
}



const recipe:RecipeCardProps[] = [{
  title: "Special Recipe of Vietnamese Phở",
  description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
  imageSrc: image12.src
},{
  title: "Original Recipe of Curry",
  description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
  imageSrc: image13.src
},{
  title: "The Best Recipe of Beef Noodle Soup",
  description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
  imageSrc: image14.src
},{
  title: "Special Recipe of Vietnamese Phở",
  description:"Alright, before we get to the actual recipe, let’s chat for a sec about the ingredients.  To make this pho soup recipe, you will need:",
  imageSrc: image12.src
},{
  title: "Original Recipe of Curry",
  description:"Chicken curry is common to several countries including India, countries in Asia and the Caribbean. My favorite of them though is this aromatic Indian...",
  imageSrc: image13.src
},{
  title: "The Best Recipe of Beef Noodle Soup",
  description:"The broth for Bun Bo Hue is prepared by slowly simmering various types of beef and pork bones (ox tail, beef shank, pork neck bones, pork feet,...",
  imageSrc: image14.src
}]


const TABS = [
  {
    name: 'Noodle',
    value: 'Noodle',
  },
  {
    name: 'Curry',
    value: 'Curry',
  },
  {
    name: 'Special Recipes',
    value: 'Special Recipes',
  }
]

const HomeRecipe = ({ data =recipe, itemKey="home-recipe", title="Special Recipes" }: HomeRecipeProps) => {
  const [activeTab, setActiveTab] = useState<string>(TABS[0].value)

  const  onTabChanged = (value: string) => {
    setActiveTab(value)
  }
  
  return (
    <div className={s.homeRecipeWarpper}>
      <div className={s.top}>
        <div className={s.left}>
          <HeadingCommon>{title}</HeadingCommon>
        </div>
        <div className={s.right}>
          <ViewAllItem link="#"/>
        </div>
      </div>
			<div className={s.mid}>
        {
          TABS.map(item => <HomeRecipeTab
            key={item.value}
            activeValue={activeTab}
            name={item.name}
            value={item.value}
            onClick={onTabChanged} />)
        }
      </div>
      <div className={s.bot}>
        <RecipeCarousel data={data} itemKey={itemKey} />
      </div>
    </div>
  )
}

export default HomeRecipe