import { ProviderTuple, composeProviders } from "../utils/helpers";
import { AuthProvider } from "../context/auth";

const providers: ProviderTuple[] = [
  [AuthProvider, {}],
];

export const GlobalProvider = composeProviders(providers);
