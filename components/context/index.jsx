import { HandlerProvider } from './pokemonHandler';

export default function ContextProvider({ children }) {
  return (
    <HandlerProvider>
      {children}
    </HandlerProvider>
  );
}
