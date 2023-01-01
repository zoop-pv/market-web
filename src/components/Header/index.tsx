import Image from "next/image";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import styles from "./styles.module.scss";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { useEffect, useState, forwardRef } from "react";

const CircularProgressComponent = (props: JSX.IntrinsicAttributes) => {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
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
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={20}
        thickness={3}
        {...props}
      />
    </Box>
  );
};

type HeaderProps = {
  isValidating: boolean;
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const Header = forwardRef<HTMLInputElement, HeaderProps>(
  ({ isValidating, searchText, setSearchText }, ref) => {
    const router = useRouter();
    const [localSearchText, setLocalSearchText] = useState(searchText);
    var searchTextDebounced = debounce(
      (e: { target: { value: string | string[] | undefined } }) => {
        router.query.text = e.target.value;
        router.push(router);
        setSearchText(e.target.value as string);
      },
      200
    );
    const handleSearchTextChange = (e: any) => {
      setLocalSearchText(e.target.value as string);
      searchTextDebounced(e);
    };

    useEffect(() => {
      if (searchText) {
        setLocalSearchText(searchText);
      }
    }, [searchText]);

    return (
      <header className={styles.header} ref={ref}>
        <div className={`container ${styles.innerContainer}`}>
          <div className={styles.logoContainer}>
            <Image
              src="/assets/icons/logo.svg"
              width={48}
              height={48}
              alt="logo"
            />
            <h1>Puravida</h1>
          </div>
          <div className={styles.inputContainer}>
            <Image
              className={styles.searchIcon}
              src="/assets/icons/Vector.svg"
              width={19}
              height={19}
              alt="search"
            />
            <input
              value={localSearchText}
              placeholder="Restaurants"
              onChange={handleSearchTextChange}
            />
            {isValidating && (
              <div className={styles.loadingSpinner}>
                <CircularProgressComponent />
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "NavHeader";

export default Header;
