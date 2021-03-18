import React from "react";
import ChoiceButton from "../components/ChoiceButton";
import styles from "../styles/pages/Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <img
        className={styles.logo}
        src="/icons/webmotors_logo.svg"
        alt="WebMotors"
        title="WebMotors"
        width="207"
      />

      <div className={styles.buyContainer}>
        <div className={styles.headerBox}>
          <div>
            <ChoiceButton src="/icons/icon_car.svg" tag="CARROS" />
            <ChoiceButton src="/icons/icon_motorcycle.svg" tag="MOTOS" />
          </div>

          <button>Vender meu carro</button>
        </div>

        <div className={styles.searchBox}>
          <div>
            <button className={styles.promotionButton}>VER OFERTAS</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
