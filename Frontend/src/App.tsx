import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './features/auth/auth-context'
import Shell from './features/layout/Shell'
import Loader from './features/common/Loader'

const LoginView = lazy(() => import('./features/auth/LoginView'))
const ProductsCatalog = lazy(() => import('./features/products/ProductsCatalog'))
const ProductDetail = lazy(() => import('./features/products/ProductDetail'))
const CustomerProfile = lazy(() => import('./features/customers/CustomerProfile'))
const CustomerEdit = lazy(() => import('./features/customers/CustomerEdit'))

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader label="Cargando..." />}>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route
            path="/"
            element={
              <Protected>
                <Shell />
              </Protected>
            }
          >
            <Route index element={<Navigate to="/products" replace />} />
            <Route path="products" element={<ProductsCatalog />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="customers/:id" element={<CustomerProfile />} />
            <Route path="customers/:id/edit" element={<CustomerEdit />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
