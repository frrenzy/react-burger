import { FC } from 'react'

import loadingStyles from './loading.module.scss'

const Loading: FC<{}> = () => {
  return <div className={loadingStyles.spinner}></div>
}

export default Loading
