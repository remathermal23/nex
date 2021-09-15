import Link from 'next/link'
import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import { RecipeProps } from 'src/utils/types.utils'
import s from './RecipeCard.module.scss'
export interface RecipeCardProps extends RecipeProps { }

const RecipeCard = ({ imageSrc, title, description, slug }: RecipeCardProps) => {
  return (
    <div className={s.recipeCardWarpper}>
      <Link href={`${ROUTE.RECIPE_DETAIL}/${slug}`}>
        <a>
          <div className={s.image}>
            <img src={imageSrc} alt="image recipe" />
          </div>
        </a>
      </Link>
      <Link href={`${ROUTE.RECIPE_DETAIL}/${slug}`}>
        <a>
          <div className={s.title}>{title}</div>
        </a>
      </Link>
      <div className={s.description}>{description}</div>
    </div>
  )
}

export default RecipeCard