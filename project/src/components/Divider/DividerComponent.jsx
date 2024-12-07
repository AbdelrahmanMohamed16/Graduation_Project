import img from "../../assets/images/ق-removebg-preview.png";
import styles from "./style.module.css";
import Box from "@mui/material/Box";
function DividerComponent() {
  return (
    <div className={styles.div} style={{ marginTop: 80, marginBottom: 80 }}>
      <hr />
      <span className={styles.span}>
        <img src={img} alt="" style={{ width: "100px", height: "60px" }} />
      </span>
    </div>
  );
}

export default DividerComponent;
