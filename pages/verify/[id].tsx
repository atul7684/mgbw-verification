import { GetServerSideProps } from "next";
import { useState } from "react";

interface Product {
  ["UNIQUE CODE"]: string;
  MOM: string;
  State: string;
  Contractor: string;
  Industries: string;
  Distributer: string;
  password: string;
}

interface PageProps {
  product: Product | null;
}

const ProductPage = ({ product }: PageProps) => {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return <div style={{ padding: 20 }}>❌ Product not found</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === product.password) {
      setUnlocked(true);
      setError("");
    } else {
      setError("Wrong password!");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>🔍 Verify Product: {product["UNIQUE CODE"]}</h2>

      {!unlocked ? (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: 10 }}
          />
          <button type="submit">Submit</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      ) : (
        <div style={{ marginTop: 20 }}>
          <p><strong>MOM:</strong> {product.MOM}</p>
          <p><strong>State:</strong> {product.State}</p>
          <p><strong>Contractor:</strong> {product.Contractor}</p>
          <p><strong>Industries:</strong> {product.Industries}</p>
          <p><strong>Distributer:</strong> {product.Distributer}</p>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const data = await import("../../data/products.json");
  const products = data.default;

  const product = products.find(
    (p: any) => p["UNIQUE CODE"] === id
  );

  return {
    props: {
      product: product || null,
    },
  };
};

export default ProductPage;
