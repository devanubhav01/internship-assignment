import { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Card from './components/Card.jsx';
import Button from './components/Button.jsx';
import Form from './components/Form.jsx';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' }
];

const FOOTER_LINKS = [
  { label: 'GitHub', href: '#' },
  { label: 'Privacy', href: '#' }
];

// Sample data used to demonstrate rendering a dynamic list of Cards from props
const PRODUCTS = [
  { id: 1, title: 'Starter Plan', tag: 'For individuals', description: 'Core features to get a small project off the ground.', price: 0 },
  { id: 2, title: 'Team Plan', tag: 'For small teams', description: 'Shared workspaces, roles, and priority support.', price: 19 },
  { id: 3, title: 'Scale Plan', tag: 'For growing companies', description: 'Advanced permissions, SSO, and usage analytics.', price: 49 }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  function addToCart(product) {
    setCart((prev) => [...prev, product]);
  }

  function handleFormSubmit(values) {
    setLastMessage(values);
  }

  return (
    <div className="app">
      <Header
        brand="Component Lab"
        navItems={NAV_ITEMS}
        onNavigate={(label) => console.log('Navigated to', label)}
      />

      <main className="app__main">
        <section id="products" className="app__section">
          <h2>Products</h2>
          <p className="app__hint">
            Cart items: <strong>{cart.length}</strong>
            {cart.length > 0 && ` (${cart.map((p) => p.title).join(', ')})`}
          </p>

          <div className="app__grid">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                tag={product.tag}
                title={product.title}
                description={product.description}
                footer={
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    {product.price === 0 ? 'Start free' : `Add — $${product.price}/mo`}
                  </Button>
                }
              />
            ))}
          </div>
        </section>

        <section id="contact" className="app__section">
          <h2>Contact</h2>
          <Form onSubmit={handleFormSubmit} />
          {lastMessage && (
            <p className="app__hint">
              Last submission stored in state: <code>{JSON.stringify(lastMessage)}</code>
            </p>
          )}
        </section>
      </main>

      <Footer brand="Component Lab" links={FOOTER_LINKS} />
    </div>
  );
}
