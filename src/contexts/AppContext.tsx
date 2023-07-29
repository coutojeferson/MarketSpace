import { ReactNode, createContext, useState } from 'react';

export type AppContextDataProps = {
  productPreviewData: ProductPreviewDataProps;
  saveProductPreviewData: (productData: ProductPreviewDataProps) => void;
};
export const AppContext = createContext<AppContextDataProps>(
  {} as AppContextDataProps,
);

type AppContextProviderProps = {
  children: ReactNode;
};

type ImageProductProps = {
  id: string;
  path: string;
  name: string;
  uri: string;
  type: string;
};

type ProductPreviewDataProps = {
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: any;
  images: Array<ImageProductProps>;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [productPreviewData, setProductPreviewData] =
    useState<ProductPreviewDataProps>({} as ProductPreviewDataProps);

  function saveProductPreviewData(productData: ProductPreviewDataProps) {
    setProductPreviewData(productData);
  }

  return (
    <AppContext.Provider
      value={{
        productPreviewData,
        saveProductPreviewData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
