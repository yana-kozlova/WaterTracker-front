import css from "./BottleImg.module.css";
import bottleMobile from "../../assets/images/bottleMobile.png";
import bottleTablet from "../../assets/images/bottleTablet.png";
import bottle from "../../assets/images/bottle.png";
const BottleImg = ({ className = "" }) => {
  return (
    <picture className={className}>
      <source
        srcSet={bottleMobile}
        media="(max-width:767px)"
        type="image/png"
      />
      <source
        srcSet={bottleTablet}
        media="(max-width:1439px)"
        type="image/png"
      />
      <source srcSet={bottle} media="(min-width:1440px)" type="image/png" />
      <img
        src={bottle}
        className={css.img}
        alt="Bottle"
        width="916"
        height="680"
      />
    </picture>
  );
};

export default BottleImg;
