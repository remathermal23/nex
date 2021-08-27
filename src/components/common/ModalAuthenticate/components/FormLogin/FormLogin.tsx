import Link from 'next/link'
import React from 'react'
import { Inputcommon, ButtonCommon } from 'src/components/common'
import { ROUTE } from 'src/utils/constanst.utils'
import SocialAuthen from '../SocialAuthen/SocialAuthen'
import s from '../FormAuthen.module.scss'
import styles from './FormLogin.module.scss'
import classNames from 'classnames'

interface Props {
    isHide: boolean,
    onSwitch: () => void
}

const FormLogin = ({ onSwitch, isHide }: Props) => {
    return (
        <section className={classNames({
            [s.formAuthen]: true,
            [styles.hide]: isHide
        })}>
            <div className={s.inner}>
                <div className={s.body}>
                    <Inputcommon placeholder='Email Address' type='email' />
                    <Inputcommon placeholder='Password' type='password' />
                </div>
                <div className={styles.bottom}>
                    <Link href={ROUTE.FORGOT_PASSWORD}>
                        <a href="" className={styles.forgotPassword}>
                            Forgot Password?
                        </a>
                    </Link>
                    <ButtonCommon size='large'>Sign in</ButtonCommon>
                </div>
                <SocialAuthen />
                <div className={s.others}>
                    <span>Don't have an account?</span>
                    <button onClick={onSwitch}>Create Account</button>
                </div>
            </div>
        </section>
    )
}

export default FormLogin