import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./User.module.sass";
import Icon from "../../Icon";
import Theme from "../../Theme";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logOut } from "../../../redux/auth/auth.thunk";
import { selectUser } from "../../../redux/selectors";

const items = [
  {
    title: "My profile",
    icon: "user",
    url: "/profile",
  },
  // {
  //   title: "My favorites posts",
  //   icon: "image",
  //   url: "/?filter=favorites",
  // },
  {
    title: "Dark theme",
    icon: "bulb",
  },
  {
    title: "Sign Out",
    icon: "exit",
    url: "logout",
  },
];

export interface UserNavProps {
  className?: string;
  setVisibleNav: () => void;
}

const User = ({ className, setVisibleNav }: UserNavProps) => {
  const user = useAppSelector(selectUser);
  const [visible, setVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await dispatch(logOut());
    setVisible(!visible);
    setVisibleNav();
    navigate("/");
  };

  return (
    <div ref={dropdownRef} className={cn(styles.user, className)}>
      <div className={styles.head} onClick={() => setVisible(!visible)}>
        <div className={styles.avatar}>
          <img src="/images/user.png" alt="Avatar" />
        </div>
        <div className={styles.wallet}>
          <span className={styles.currency}>{user?.name}</span>
        </div>
      </div>
      {visible && (
        <div className={styles.body}>
          <div className={styles.name}>{user?.name}</div>
          <div className={styles.code}>
            <div className={styles.number}>{user?.email}</div>
            <button
              className={styles.copy}
              onClick={() => {
                setVisible(!visible);
                setVisibleNav();
              }}
            >
              <Icon title="copy" size={16} />
            </button>
          </div>
          <div className={styles.wrap}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => {
                navigate("/change-password");
                setVisible(!visible);
                setVisibleNav();
              }}
            >
              Change Password
            </button>
          </div>
          <div className={styles.menu}>
            {items.map((i, index) =>
              i.url ? (
                i.url.endsWith("logout") ? (
                  <button
                    type="button"
                    className={styles.item}
                    onClick={logoutHandler}
                    key={index}
                  >
                    <div className={styles.icon}>
                      <Icon title={i.icon} size={20} />
                    </div>
                    <div className={styles.text}>{i.title}</div>
                  </button>
                ) : (
                  <Link
                    className={styles.item}
                    to={i.url}
                    onClick={() => {
                      setVisible(!visible);
                      setVisibleNav();
                    }}
                    key={index}
                  >
                    <div className={styles.icon}>
                      <Icon title={i.icon} size={20} />
                    </div>
                    <div className={styles.text}>{i.title}</div>
                  </Link>
                )
              ) : (
                <div className={styles.item} key={index}>
                  <div className={styles.icon}>
                    <Icon title={i.icon} size={20} />
                  </div>
                  <div className={styles.text}>{i.title}</div>
                  <Theme className={styles.theme} />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
