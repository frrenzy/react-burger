import { FC, ReactNode } from 'react'

import sectionStyles from './section.module.scss'

interface ISectionProps {
  children: ReactNode
}

const Section: FC<ISectionProps> = ({ children }) => {
  return <section className={sectionStyles.section}>{children}</section>
}

export default Section
