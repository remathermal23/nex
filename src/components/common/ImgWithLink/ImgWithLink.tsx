import React from 'react'
import s from './ImgWithLink.module.scss'
import Image from 'next/image'
import { BLUR_DATA_IMG, DEFAULT_IMG } from 'src/utils/constanst.utils'

export interface ImgWithLinkProps {
    src: string,
    alt?: string,
    blurDataURL?: string,
}

const ImgWithLink = ({ src, alt, blurDataURL = BLUR_DATA_IMG }: ImgWithLinkProps) => {
    return (
        <div className={s.imgWithLink}>
            <Image src={src || DEFAULT_IMG.src} alt={alt}
                layout="fill"
                className={s.imgWithLink}
                placeholder="blur"
                blurDataURL={blurDataURL}
                draggable='false'
            />
        </div>
    )
}

export default ImgWithLink