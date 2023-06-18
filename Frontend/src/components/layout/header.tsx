import styles from '../../styles/Image.module.css'

export default function Header() {
    return (
      <div className='absolute w-screen'>
        <div className="flex flex-wrap items-center justify-between bg-[#2A347B] mt-[36px]"> 
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