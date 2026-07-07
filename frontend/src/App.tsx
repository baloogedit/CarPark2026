import './App.css'
import { Content } from './components/Content/Content'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'
import {FavoritesProvider} from './contexts/FavoritesProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage/AdminPage'
import { BasketPage } from './pages/BasketPage/BasketPage'
import { Navigation } from './components/Navigation/Navigation'
import { BasketProvider } from './contexts/BasketProvider'

export function App() {
    return (
        <BrowserRouter>
        <div className="AppShell">
            <div className="AppShell__ambient AppShell__ambient--one" />
            <div className="AppShell__ambient AppShell__ambient--two" />
            <div className="AppShell__frame">
                <FavoritesProvider>
                    <FiltersProvider>
                        <CarListProvider>
                            <BasketProvider>
                                <Navigation />
                                
                                <Routes>
                                    <Route path="/" element={<Content />} />
                                    <Route path="/basket" element={<BasketPage />} />
                                    <Route path="/admin" element={<AdminPage />} />
                                </Routes>
                            </BasketProvider>
                        </CarListProvider>
                    </FiltersProvider>
                </FavoritesProvider>
            </div>
        </div>
        </BrowserRouter>
    )
}

