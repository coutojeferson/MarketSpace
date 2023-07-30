import { ReactNode, createContext, useState } from 'react';

export type AppContextDataProps = {
  productPreviewData: ProductDataProps;
  productDataToUpdate: ProductDataProps;
  saveProductPreviewData: (productData: ProductDataProps) => void;
  saveProductDataToUpdate: (productData: ProductDataProps) => void;
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

type ProductDataProps = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: any;
  images: Array<ImageProductProps>;
  listImagesToRemove?: String[];
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [productPreviewData, setProductPreviewData] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productDataToUpdate, setProductDataToUpdate] =
    useState<ProductDataProps>({} as ProductDataProps);

  function saveProductPreviewData(productData: ProductDataProps) {
    setProductPreviewData(productData);
  }

  function saveProductDataToUpdate(productData: ProductDataProps) {
    setProductDataToUpdate(productData);
  }

  return (
    <AppContext.Provider
      value={{
        productPreviewData,
        productDataToUpdate,
        saveProductPreviewData,
        saveProductDataToUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
