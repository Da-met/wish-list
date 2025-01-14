import { createRoot } from 'react-dom/client';
import { render } from "react-dom";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "app/providers/ThemeProvider";
import { ErrorBoundary } from "app/providers/ErrorBoundary";
import 'app/styles/index.scss';
import { StoreProvider } from "app/providers/StoreProvider";


const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер root не найден. НЕ удалось вмонтировать реакт приложение');
}

const root = createRoot(container);

root.render (
    <BrowserRouter>
        <StoreProvider>
                <ErrorBoundary>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
)