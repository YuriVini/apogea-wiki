/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProviderProps {
  children?: React.ReactNode
  [key: string]: any
}

type ProviderComponent = React.ComponentType<ProviderProps>

export type ProviderTuple = [ProviderComponent, ProviderProps]

export const composeProviders =
  (providers: ProviderTuple[]) =>
  ({ children }: { children: React.ReactNode }) => {
    return providers.reduceRight((acc, [Provider, props]) => <Provider {...props}>{acc}</Provider>, children)
  }
