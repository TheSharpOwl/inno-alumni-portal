import styles from '../../styles/image.module.css'

export default function Header() {
    return (
      <div className='absolute w-screen'>
        <div className="flex flex-wrap items-center justify-between mt-[36px]"> 
          <div className='ml-[2.64%]'>
              <div className={styles.logoAlumni}></div>
          </div>
          <div className='mr-[2.64%]'>
              <div className={styles.logo}></div>
          </div>
        </div>
      </div>
      
    )
  }