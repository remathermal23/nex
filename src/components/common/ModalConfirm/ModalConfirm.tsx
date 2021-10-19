import React from 'react'
import ButtonCommon from '../ButtonCommon/ButtonCommon'
import ModalCommon, { ModalCommonProps } from '../ModalCommon/ModalCommon'
import s from './ModalConfirm.module.scss'
interface ModalConfirmProps extends ModalCommonProps {
  okText?: String
  cancelText?: String
  loading?:boolean
  onOk?: () => void
  onCancel?: () => void
}

const ModalConfirm = ({
  okText = 'Ok',
  cancelText = 'cancel',
  onOk,
  onCancel,
  children,
  title = 'Confirm',
  loading,
  onClose,
  ...props
}: ModalConfirmProps) => {
  return (
    <ModalCommon onClose={onClose} title={title} {...props}>
      {children}
      <div className={s.footer}>
        <div className="mr-4">
          <ButtonCommon onClick={onCancel || onClose} type="light"> {cancelText}</ButtonCommon>
        </div>
          <ButtonCommon onClick={onOk} loading={loading}>{okText}</ButtonCommon>
      </div>
    </ModalCommon>
  )
}

export default ModalConfirm
