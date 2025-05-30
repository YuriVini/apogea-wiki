import { ProviderTuple, composeProviders } from "../utils/helpers";
import { AuthProvider } from "../context/auth";
import { BuilderProvider } from "../context/builder";
const providers: ProviderTuple[] = [
  [AuthProvider, {}],
  [BuilderProvider, {}],
];

export const GlobalProvider = composeProviders(providers);
