import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";
import toast from "react-hot-toast";
import moment from "moment";
import { GetPost } from "../../types/posts.types";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../helpers/darkModeContext";

interface CardProps {
  className: string;
  like?: (id: string) => void;
  userId?: string;
  post: GetPost;
}

const Card = ({ className, post, like, userId }: CardProps) => {
  const { _id, title, description, images, kits, favorites, upload_at } = post;
  const visible = favorites.some((id) => id === userId);
  const { t } = useTranslation();
  const { locale } = useTheme();

  return (
    <div className={cn(styles.card, className)}>
      <Link to={`/post/${_id}`}>
        <div className={styles.preview}>
          {images && images.length >= 4 && (
            <div className={styles.preview4x}>
              {images.slice(0, 4).map((i, index) => {
                return index === 0 ? (
                  <div key={index} className={styles.firstRows}>
                    <img
                      src={i}
                      alt="Post Image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/content/postsimg/post-template.jpg";
                      }}
                    />
                  </div>
                ) : (
                  <div key={index} className={styles.imgwrapper}>
                    <img
                      src={i}
                      alt="Post Image"
                      onError={(e) => {
                        e.currentTarget.src =
                          "/images/content/postsimg/post-template.jpg";
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
          {images && images.length < 4 && (
            <div className={styles.preview1x}>
              <img
                src={images[0]}
                alt="Post Image"
                onError={(e) => {
                  e.currentTarget.src =
                    "/images/content/postsimg/post-template.jpg";
                }}
              />
            </div>
          )}
          {(!images || images.length < 0) && (
            <div className={styles.preview}>
              <img
                src={"/images/content/postsimg/post-template.jpg"}
                alt="Post Template Image"
              />
            </div>
          )}
          <div className={styles.control}>
            <button
              type="button"
              className={cn(styles.favorite, { [styles.active]: visible })}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (like) {
                  like(_id);
                } else {
                  toast("Please sign in first!", {
                    icon: "👋",
                  });
                }
              }}
            >
              <Icon title="heart" size={20} />
            </button>
          </div>
        </div>
      </Link>
      <div className={styles.desc}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{title}</div>
            {/* <div className={styles.price}>{item.price}</div> */}
          </div>
          <div className={styles.line}>
            <div className={styles.kits}>
              {kits.map((i, index) => (
                <div className={styles.logo} key={index}>
                  <img
                    src={`./images/kit-logo/${i}-prog.svg`}
                    width={18}
                    alt="logo"
                  />
                </div>
              ))}
            </div>
            <Link to={`/post/${_id}`}>
              <button className={styles.counter}>{t("card-detail")}</button>
            </Link>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.description}>
            <span>
              {typeof description === "string"
                ? description
                : locale === "UA"
                ? description.ua
                : description.en}
            </span>
          </div>
          <div className={styles.description}>
            <Icon title="candlesticks-up" size={20} />
            <span>
              {t("post-created")}
              <span>
                {moment(new Date(upload_at)).format("DD MMM YYYY HH:mm")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
