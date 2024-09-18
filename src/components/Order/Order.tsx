import { useState } from "react";
import "./Order.scss";



export const Order = () => {
  const [buyerName, setBuyerName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBuyerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyerName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission logic here
    console.log("Order submitted", {

    });
  };

  return (
    <article className="order">
      <h5 className="order__section-title">Оформлення замовлення</h5>
      <p className="order__text">Будь ласка, вкажіть своє ім'я та номер телефону, щоб наш менеджер міг зв'язатись з Вами для обговорення деталей Вашого замовлення</p>
      
      <form className="order__form" action="" method="POST" onSubmit={handleSubmit}>
        <section className="buyer-info">
          <label className="buyer-info__label">
            <input
              type="tel"
              id="phone-number"
              value={buyerName}
              onChange={handleBuyerNameChange}
              placeholder="Ім'я та прізвище"
              className="buyer-info__input"
            />
          </label>
          <label className="buyer-info__label">
            <input
              type="tel"
              id="phone-number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="+380 ..."
              className="buyer-info__input"
            />
          </label>
        </section>

        <button className="order__confirm-button">Підтвердити замовлення</button>
      </form>
    </article>
  );
};

{

}
