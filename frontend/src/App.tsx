import './App.css'
import { Content } from './components/Content/Content'
import { FiltersProvider } from './contexts/FiltersProvider'
import { CarListProvider } from './contexts/CarListProvider'

export function App() {
    return (
        <div className="AppShell">
            <div className="AppShell__ambient AppShell__ambient--one" />
            <div className="AppShell__ambient AppShell__ambient--two" />
            <div className="AppShell__frame">
                <FiltersProvider>
                    <CarListProvider>
                        <Content />
                    </CarListProvider>
                </FiltersProvider>
            </div>
        </div>
    )
}

