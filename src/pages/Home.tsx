/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react";
import CheckBox from "../components/CheckBox";
import ChoiceButton from "../components/ChoiceButton";
import CustomInput from "../components/CustomInput";
import Select, { CustomSelectOptions } from "../components/CustomSelect";
import api from "../services/api";
import styles from "../styles/pages/Home.module.css";

interface VehiclesI {
  ID: number;
  Make: string;
  Model: string;
  Version: string;
  Image: string;
  KM: number;
  Price: string;
  YearModel: number;
  YearFab: number;
  Color: string;
}

const yearOptions = [{ label: "De 2010 á 2021", value: "2010,2020" }];
const priceOptions = [{ label: "De 0 á 100000", value: "0,100000" }];

const Home: React.FC = () => {
  const [marcas, setMarcas] = useState([{ label: "Todas", value: 0 }]);
  const [modelos, setModelos] = useState<CustomSelectOptions[]>([
    { label: "Todas", value: 0 },
  ]);
  const [versao, setVersao] = useState<CustomSelectOptions[]>([
    { label: "Todas", value: 0 },
  ]);
  const [marcasValue, setMarcasValue] = useState<any>(0);
  const [modelosValue, setModelosValue] = useState<any>(0);
  const [versaoValue, setVersaoValue] = useState<any>(0);
  const [yearValue, setYearValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    api.get("/Make").then(({ data }) => {
      const response = data.map((marca: any) => ({
        label: marca.Name,
        value: marca.ID,
      }));
      setMarcas((prev) => [...prev, ...response]);
    });
  }, [setMarcas]);

  useEffect(() => {
    if (marcasValue) {
      api
        .get("/Model", { params: { MakeID: marcasValue.value } })
        .then(({ data }) => {
          const response = data.map((modelo: any) => ({
            label: modelo.Name,
            value: modelo.ID,
          }));
          setModelos([{ label: "Todas", value: 0 }, ...response]);
        });
    } else {
      setModelos([{ label: "Todas", value: 0 }]);
    }
  }, [marcasValue]);

  useEffect(() => {
    if (modelosValue) {
      api
        .get("/Version", { params: { ModelID: modelosValue.value } })
        .then(({ data }) => {
          const response = data.map((versao: any) => ({
            label: versao.Name,
            value: versao.ID,
          }));
          setVersao([{ label: "Todas", value: 0 }, ...response]);
        });
    } else {
      setVersao([{ label: "Todas", value: 0 }]);
    }
  }, [modelosValue]);

  const handleSubmit = () => {
    api.get("/Vehicles", { params: { Page: 2 } }).then(({ data }) => {
      setVehicles(
        data.filter((veiculos: VehiclesI) => {
          //Filtros dos veiculos
          const [minPrice, maxPrice] = priceValue.split(",");
          const [minYear, maxYear] = yearValue.split(",");
          const filterMake =
            marcasValue.label === "Todas" ||
            marcasValue.label === veiculos.Make;
          const filterModel =
            modelosValue.label === "Todas" ||
            modelosValue.label === veiculos.Model;
          const filterVersion =
            versaoValue.label === "Todas" ||
            versaoValue.label === veiculos.Version;
          const filterPrice =
            Number(veiculos.Price.replace(",00", "")) >= Number(minPrice);
          Number(veiculos.Price.replace(",00", "")) <= Number(maxPrice);
          const filterYear =
            veiculos.YearModel >= Number(minYear) &&
            veiculos.YearModel <= Number(maxYear);
          return (
            filterMake &&
            filterModel &&
            filterVersion &&
            filterPrice &&
            filterYear
          );
        })
      );
    });
  };
  useEffect(() => {
    console.log(vehicles);
  }, [vehicles]);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.buyContainer}>
        <img
          className={styles.logo}
          src="/icons/webmotors_logo.svg"
          alt="WebMotors"
          title="WebMotors"
          width="207"
        />
        <div className={styles.headerBox}>
          <div>
            <ChoiceButton src="/icons/icon_car.svg" tag="CARROS" />
            <ChoiceButton src="/icons/icon_motorcycle.svg" tag="MOTOS" />
          </div>

          <button>Vender meu carro</button>
        </div>
        <div className={styles.searchBox}>
          <div className={styles.searchHead}>
            <CheckBox title="Novos" />
            <CheckBox title="Usados" />
          </div>

          <div className={styles.searchBody}>
            <div className={styles.row}>
              <div className={styles.colunm}>
                <CustomInput
                  left="Teste"
                  right={
                    <Select name="Raio" options={[]} onChange={() => {}} />
                  }
                />
              </div>

              <div className={styles.colunm}>
                <div className={styles.row}>
                  <div className={styles.colunm}>
                    <Select
                      name="Marca"
                      options={marcas}
                      onChange={setMarcasValue}
                    />
                  </div>

                  <div className={styles.colunm}>
                    <Select
                      name="Modelos"
                      options={modelos}
                      onChange={setModelosValue}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.row} style={{ marginTop: 10 }}>
              <div className={styles.colunm}>
                <div className={styles.row}>
                  <div className={styles.colunm}>
                    <Select
                      name="Ano"
                      options={yearOptions}
                      placeholder="Ano desejado"
                      hideLabel
                      onChange={({ value }) => setYearValue(value)}
                    />
                  </div>

                  <div className={styles.colunm}>
                    <Select
                      name="Preço"
                      options={priceOptions}
                      placeholder="Faixa de Preço"
                      hideLabel
                      onChange={({ value }) => setPriceValue(value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.colunm}>
                <Select
                  name="Versão"
                  options={versao}
                  onChange={setVersaoValue}
                />
              </div>
            </div>

            <div className={styles.searchFooter}>
              <h4>
                <i className={styles.arrowRight} /> Busca Avançada
              </h4>
              <div>
                <p>Limpar filtros</p>
                <button
                  className={styles.promotionButton}
                  onClick={handleSubmit}
                >
                  VER OFERTAS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
