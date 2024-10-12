import React from 'react';
import { ShoppingCart, Package, DollarSign, Store } from 'lucide-react';

const EcommerceIcons: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.iconContainer}>
        <ShoppingCart size={48} color="#FF9900" /> {/* Amazon (represented by cart) */}
        <h3>Amazon</h3>
        <p>Amazon is a global leader in e-commerce, offering a vast selection of goods across various categories, from electronics to groceries.</p>
      </div>
      <div style={styles.iconContainer}>
        <Package size={48} color="#FF6A00" /> {/* Alibaba (represented by package) */}
        <h3>Alibaba</h3>
        <p>Alibaba is a leading e-commerce platform in China, connecting international buyers and sellers through its marketplace.</p>
      </div>
      <div style={styles.iconContainer}>
        <Store size={48} color="#0071CE" /> {/* Walmart (represented by store) */}
        <h3>Walmart</h3>
        <p>Walmart operates a chain of hypermarkets and e-commerce platforms, offering a wide variety of products at low prices.</p>
      </div>
      <div style={styles.iconContainer}>
        <DollarSign size={48} color="#CC0000" /> {/* Target (represented by money sign) */}
        <h3>Target</h3>
        <p>Target is a popular American retailer known for offering quality products in the home, fashion, and electronics categories.</p>
      </div>
      <div style={styles.iconContainer}>
        <ShoppingCart size={48} color="#F16521" /> {/* Etsy (represented by cart) */}
        <h3>Etsy</h3>
        <p>Etsy is a unique marketplace specializing in handmade and vintage items, connecting independent sellers with global customers.</p>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    textAlign: 'center' as const,
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  iconContainer: {
    maxWidth: '300px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
};

export default EcommerceIcons;
