import styles from '../../styles/Layout.module.css'

export default function Layout({children}: {children: React.ReactNode}): JSX.Element {
  return (
    <div className="flex h-screen bg-[#F2F3F5]">
      <div className="m-auto bg-[#ECEBF0] rounded-md w-4/5 md:w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}></div>
        </div>
        <div className="right flex flex-col justify-evenly bg-[#12152A]">
          <div className="text-center py-10">
            {children}
          </div>
        </div>
      </div>  
    </div>
  )
}