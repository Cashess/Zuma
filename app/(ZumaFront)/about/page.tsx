import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section style={styles.container}>
      <h1 style={styles.heading}>About Zuma Store</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>Zuma Store</strong>, your trusted destination for niche products delivered locally, without the hassle of importing from abroad. At Zuma, we are dedicated to making high-quality, hard-to-find items easily accessible to our customers, bridging the gap between local needs and global markets.
      </p>
      <p style={styles.paragraph}>
        Our mission is to simplify your shopping experience by providing a curated selection of products, typically available only through overseas suppliers. By eliminating the complexities of international shipping and long delivery times, we help you save time and money while supporting local business growth.
      </p>
      <h2 style={styles.subHeading}>Why Choose Zuma Store?</h2>
      <ul style={styles.list}>
        <li><strong>No More Waiting:</strong> All products are available locally, cutting down the typical delays of international shipments.</li>
        <li><strong>Customer-Centric Approach:</strong> Our focus is on delivering excellent customer service and ensuring your satisfaction with every purchase.</li>
        <li><strong>Trusted Quality:</strong> We carefully vet our suppliers and products to ensure you're getting the best for your money.</li>
      </ul>
      <p style={styles.paragraph}>
        At Zuma Store, we believe in empowering local communities through seamless access to global goods. We invite you to explore our offerings and experience the convenience of stress-free, local shopping. Thank you for choosing Zuma Store—we look forward to serving you!
      </p>
    </section>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  heading: {
    fontSize: '2em',
    color: '#B89E97',
    textAlign: 'center' as const,  // TypeScript requires a cast here because 'textAlign' can have more than one possible type
    marginBottom: '20px',
  },
  subHeading: {
    fontSize: '1.5em',
    color: '#333',
    marginTop: '20px',
  },
  paragraph: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginBottom: '15px',
  },
  list: {
    fontSize: '1.1em',
    lineHeight: '1.6',
    marginLeft: '20px',
    marginBottom: '15px',
  },
};

export default AboutUs;
