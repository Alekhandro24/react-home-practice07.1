import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from 'redux/index';
import { useState } from 'react';

function App() {
  const [count, setCouunt] = useState('');
  const [newProduct, setNewProduct] = useState('');
  // запрос на сервер за нашими даними, поверне об*єкт
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct('');
    }
  };

  const handleDeleteProduct = async id => {
    await deleteProduct(id).unwrap();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={e => setNewProduct(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddProduct}
          style={{ cursor: 'pointer' }}
        >
          Add product
        </button>
      </div>
      <div>
        <select value={count} onChange={e => setCouunt(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <span
              onClick={() => handleDeleteProduct(item.id)}
              style={{ cursor: 'pointer' }}
            >
              ⌫
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
