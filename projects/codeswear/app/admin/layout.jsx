

import Link from "next/link"
import styles from "@/styles/adminStyles.module.css"

const layout = ({children}) => {
  return (
    <div className={styles.admin}>
      {children}
    </div>
  )
}

export default layout
