import styles from "./CardContainer.module.scss";
import type { ICardDataProps } from "../../types/Card";
import { Card } from "../Card";

interface ICardContainerProps {
  cardData: ICardDataProps[]
}

export const CardContainer = ({cardData = []}: ICardContainerProps) => {
  return (
    <div className={styles.cardContainer}>
      {cardData.map((item, index) => {
          return <Card item={item} key={index} cardKey={index} />;
        })}
    </div>
  );
};
