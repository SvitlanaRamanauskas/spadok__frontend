import { useNavigate } from 'react-router-dom';
import './OrderConfirmationModal.scss';

type Props = {
    onClose: () => void,
    orderNumber: string,
}

export const OrderConfirmationModal: React.FC<Props> = ({ onClose, orderNumber }) => {
    const navigate = useNavigate();

  return (
    <div className="modal__overlay">
      <div className="modal__overlay-content">
        <h2>Замовлення відправлене.</h2>
        <p>Ваше замовлення успішно відправлене.</p>
        <p>Наш менеджер зв'яжеться з вами найближчим часом.</p>
        <p>Дякуємо за замовлення!</p>
        <p>{`Ваш номер замовлення ${orderNumber}`}</p>

        <button onClick={() => {
            onClose();
            navigate('/');
        }} className="modal__overlay-button">
          Close
        </button>
      </div>
    </div>
  );
};
