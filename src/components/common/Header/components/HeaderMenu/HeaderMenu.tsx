import classNames from 'classnames'
import Link from 'next/link'
import { memo } from 'react'
import InputSearch from 'src/components/common/InputSearch/InputSearch'
import MenuDropdown from 'src/components/common/MenuDropdown/MenuDropdown'
import { IconBuy, IconHeart, IconHistory, IconUser } from 'src/components/icons'
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import s from './HeaderMenu.module.scss'

const OPTION_MENU = [
    {
        link: ROUTE.ACCOUNT,
        name: 'Account',
    },
    {
        link: '/',
        name: 'Logout',
    },

]

interface Props {
    children?: any,
    isFull: boolean,
}

const HeaderMenu = memo(({ isFull }: Props) => {
    return (
        <section className={classNames({ [s.headerMenu]: true, [s.full]: isFull })}>
            <div className={s.left}>
                <div className={s.top}>
                    <div>Online Grocery</div>
                    <button className={s.iconCart}>
                        <IconBuy />
                    </button>
                </div>
                <div className={s.inputSearch}>
                    <InputSearch />
                </div>
            </div>
            <ul className={s.menu}>
                <li>
                    <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}>
                        <a >
                            <IconHistory />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.FAVOURITE}`}>
                        <a className={s.iconFovourite}>
                            <IconHeart />
                        </a>
                    </Link>
                </li>
                <li>
                    <MenuDropdown options={OPTION_MENU} isHasArrow={false}><IconUser /></MenuDropdown>
                </li>
                <li>
                    <button>
                        <IconBuy />
                    </button>
                </li>
            </ul>
        </section>
    )
})

export default HeaderMenu
