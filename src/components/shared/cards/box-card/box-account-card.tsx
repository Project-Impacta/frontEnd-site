import styles from './styles.module.css'
import React from 'react'

interface BoxAccountProps {
  children: JSX.Element
}

const BoxAccount = (props: BoxAccountProps): JSX.Element => {
  return (
    <div
      className={`${styles.root} border-2 border-solid rounded-lg border-light-formFieldBorder dark:border-2 border-solid  rounded-lg border-formFieldBorder `}
    >
      <div
        className={`${styles.container} ${styles.formCentralize} bg-light-background-primary dark:bg-dark-background-primary text-light-textPrimary dark:text-dark-textPrimary`}
      >
        {props.children}
      </div>
    </div>
  )
}

export default BoxAccount
