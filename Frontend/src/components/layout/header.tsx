import styles from '../../styles/Layout.module.css'

export default function Header() {
    return (
      <div className="flex flex-wrap items-center justify-between bg-[#2A347B]"> 
        <div>
            <div className={styles.logoAlumni}></div>
        </div>
        <div className=''>
            <div className={styles.logo}></div>
        </div>
      </div>
    )
  }