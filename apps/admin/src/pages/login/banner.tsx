import useLocale from '@/utils/useLocale';
import locale from './locale';
import styles from './style/index.module.less';

export default function LoginBanner() {
  const t = useLocale(locale);
  return (
    <div>
      <div className={styles['carousel-item']}>
        {/* <div className={styles['carousel-title']}>{item.slogan}</div>
        <div className={styles['carousel-sub-title']}>{item.subSlogan}</div> */}
        <img
          alt="banner-image"
          className={styles['carousel-image']}
          src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png"
        />
      </div>
    </div>
  );
}
