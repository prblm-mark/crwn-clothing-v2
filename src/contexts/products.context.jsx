import { createContext, useState, useEffect } from 'react'

import PRODUCTS from '../shop-data.json'

// State
export const ProductsContext = createContext({
  Products: [],
  setProducts: () => null,
})

// Provider
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS)
  const value = { products}

  useEffect(() => {}, [])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}
