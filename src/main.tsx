import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DeleteModalContextProvider } from './context/DeleteModalContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <DeleteModalContextProvider>
        <App />
    </DeleteModalContextProvider>
)
