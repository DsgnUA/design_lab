import { Link, useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Error.module.sass";
import Icon from "../../components/Icon";

import { useAppSelector } from "../../redux/hooks";
import { selectAdminError, selectUserError } from "../../redux/selectors";
import { useEffect } from "react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const errorAdmin = useAppSelector(selectAdminError);
  const errorUser = useAppSelector(selectUserError);

  useEffect(() => {
    if (!errorAdmin && (!errorUser || errorUser === "Not authorized")) {
      navigate("/");
    }
  }, [errorAdmin, errorUser, navigate]);

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <Link
            to={"/"}
            className={styles.back}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Icon title="arrow-prev" size={24} />
            <div className={cn("h2", styles.stage)}>HOME</div>
          </Link>
        </div>
        <div className={styles.body}>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              {errorAdmin && (
                <p className={cn("h3", styles.title)}>
                  Admin: <span>{errorAdmin}</span>
                </p>
              )}
              {errorUser && (
                <p className={cn("h3", styles.title)}>
                  Server:{" "}
                  {errorUser === "Network Error"
                    ? "Сurrently under maintenance."
                    : errorUser}
                </p>
              )}
              <p className={cn("h4", styles.text)}>Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
