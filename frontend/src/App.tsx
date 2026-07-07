import './App.css'
import { Content } from './components/Content/Content'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'
import {FavoritesProvider} from './contexts/FavoritesProvider'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage/AdminPage'
import { BasketPage } from './pages/BasketPage/BasketPage'
import { Navigation } from './components/Navigation/Navigation'

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
                                {/* Add the Navigation Menu at the top */}
                                <Navigation />
                                
                                {/* Define the Routes for the pages */}
                                <Routes>
                                    <Route path="/" element={<Content />} />
                                    <Route path="/basket" element={<BasketPage />} />
                                    <Route path="/admin" element={<AdminPage />} />
                                </Routes>
                            </CarListProvider>
                    </FiltersProvider>
                </FavoritesProvider>
            </div>
        </div>
        </BrowserRouter>
    )
}

