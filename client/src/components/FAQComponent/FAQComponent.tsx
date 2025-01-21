import React, { useState } from "react";
import "./FAQComponent.scss";

import arrowIcon from "../../assets/img/arrow-accordion-icon.svg";

const FAQComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleFAQ = () => {
    setOpen((prev) => !prev);
  };

  return (
    <article className={`faq__item ${open ? "open" : ""}`}>
      <button className="text--bold faq__question" onClick={toggleFAQ}>
        Могу ли я оформить доставку в другой город?
        <span className="faq__toggle">
          <img src={arrowIcon} alt="arrow-faq-icon" className="icon" />
        </span>
      </button>
      <div className="faq__answer">
        <p className="text--main">
          - Да, мы доставляем по всей России. Доставка рассчитывается отдельно.
        </p>
      </div>
    </article>
  );
};

export default FAQComponent;
