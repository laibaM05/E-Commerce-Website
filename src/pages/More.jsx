import React from 'react';
import './More.css'; // Don't forget to import the CSS file

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= rating ? 'filled' : ''}`}
      >
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

const ReviewsFaqs = () => {
  const reviews = [
    {
      id: 1,
      author: 'Ayesha Khan',
      rating: 5,
      comment: 'Absolutely love my new dress! The fabric is amazing, and it fits perfectly. Fashion Store never disappoints with their quality and style.',
    },
    {
      id: 2,
      author: 'Bilal Ahmed',
      rating: 4,
      comment: 'Great selection of shirts and the delivery was super fast. Lost one star because I wish there were more color options for men, but overall very happy!',
    },
    {
      id: 3,
      author: 'Zara Fatima',
      rating: 5,
      comment: 'Beyond impressed with the customer service and the trendy accessories. My new bag arrived beautifully packaged. Highly recommend Fashion Store for all your fashion needs!',
    },
    {
      id: 4,
      author: 'Usman Ali',
      rating: 4,
      comment: 'Good quality jeans at a reasonable price. The fit guide helped a lot. Will definitely be ordering again soon.',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'What payment methods does Fashion Store accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Cash on Delivery (COD) for orders within Pakistan.',
    },
    {
      id: 2,
      question: 'How long does shipping take?',
      answer: 'Standard shipping usually takes 3-5 business days. Express shipping options are available for an additional charge and typically deliver within 1-2 business days. Delivery times may vary depending on your location.',
    },
    {
      id: 3,
      question: 'Can I return or exchange an item?',
      answer: 'Yes, we offer a 14-day return and exchange policy from the date of delivery. Items must be unworn, unwashed, with all original tags attached. Please refer to our full Returns & Exchanges policy for detailed instructions.',
    },
    {
      id: 4,
      question: 'How do I find my size?',
      answer: 'We provide a comprehensive size guide on each product page, complete with measurements. We recommend comparing these measurements to your own to ensure the best fit. Our customer support team is also happy to assist if you have further questions.',
    },
    {
      id: 5,
      question: 'Do you offer international shipping?',
      answer: 'Currently, Fashion Store primarily ships within Pakistan. We are working on expanding our international shipping options in the near future. Please stay tuned for updates!',
    },
  ];

  return (
    <div className="reviews-faqs-container">
      {/* Reviews Section */}
      <section className="reviews-section">
        <h1 className="section-title">What Our Customers Say</h1>
        <p className="section-subtitle">Hear directly from the Fashion Store family.</p>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <StarRating rating={review.rating} />
              <p className="review-comment">"{review.comment}"</p>
              <p className="review-author">- {review.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faqs-section">
        <h1 className="section-title">Frequently Asked Questions</h1>
        <p className="section-subtitle">Find answers to common queries about Fashion Store.</p>
        <div className="faqs-list">
          {faqs.map((faq) => (
            <details key={faq.id} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsFaqs;