import React from 'react'
import { RecipeProps } from 'src/utils/types.utils'
import { ProductCardProps } from '../ProductCard/ProductCard'
import RecipeDetailInfo from './components/RecipeDetailInfo/RecipeDetailInfo'
import RecipeIngredient from './components/RecipeIngredient/RecipeIngredient'
import s from './RecipeDetail.module.scss'


interface Props extends RecipeProps  {
    className?: string
    children?: any,
    ingredients: ProductCardProps[]    
}

const RecipeDetail = ({ ingredients,...rest }: Props) => {
    return (
        <section className={s.recipeDetail}>
            <RecipeDetailInfo {...rest} />
            <RecipeIngredient data={ingredients} />
        </section >
    )
}

export default RecipeDetail