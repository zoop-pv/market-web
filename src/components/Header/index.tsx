import Image from "next/image"

import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import { useRouter } from 'next/router';
import { debounce } from "lodash"

const FacebookCircularProgress = (props: JSX.IntrinsicAttributes) => {
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={20}
        thickness={3}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={20}
        thickness={3}
        {...props}
      />
    </Box>
  );
}

export default function Header(options:any) {
  const router = useRouter();
  var searchTextDebounced = debounce((e: { target: { value: string | string[] | undefined; }; })=>{
    router.query.text = e.target.value;
    if(typeof options.setsearchText =="function"){
      options.setsearchText(e.target.value);
    }
    router.push(router)
  }, 200); 
  const handlePaginationChange = (e:any)=>{
    searchTextDebounced(e);

  };
  return (
    <header className={styles.header}>
      <div className={`container ${styles.innerContainer}`}>
        <div className={styles.logoContainer}>
          <Image src="/assets/icons/logo.svg" width={48} height={48} alt="logo"/>
          <h1>Bitcoin search tool</h1>
        </div>
        <div className={styles.inputContainer}>
          <Image className={styles.searchIcon} src="/assets/icons/Vector.svg" width={19} height={19} alt="search"/>
          <input placeholder="Restaurants" onChange={handlePaginationChange}/>
          <div className={styles.loadingSpinner}>
            <FacebookCircularProgress />
          </div>
        </div>
      </div>
    </header>
  )
}
