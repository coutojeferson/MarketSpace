import { ReactNode, createContext, useState } from 'react';

export type AppContextDataProps = {
  productPreviewData: ProductDataProps;
  productDataToUpdate: ProductDataProps;
  productSelected: ProductSelectedProps;
  saveProductPreviewData: (productData: ProductDataProps) => void;
  saveProductDataToUpdate: (productData: ProductDataProps) => void;
  saveProductSelected: (productData: ProductSelectedProps) => void;
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
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: any;
  images: Array<ImageProductProps>;
  listImagesToRemove?: String[];
};

type ProductSelectedProps = {
  id: string;
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [productPreviewData, setProductPreviewData] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productDataToUpdate, setProductDataToUpdate] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productSelected, setProductSelected] = useState<ProductSelectedProps>(
    {} as ProductSelectedProps,
  );

  function saveProductPreviewData(productData: ProductDataProps) {
    setProductPreviewData(productData);
  }

  function saveProductDataToUpdate(productData: ProductDataProps) {
    setProductDataToUpdate(productData);
  }

  function saveProductSelected(productData: ProductSelectedProps) {
    setProductSelected(productData);
  }

  return (
    <AppContext.Provider
      value={{
        productPreviewData,
        productDataToUpdate,
        productSelected,
        saveProductPreviewData,
        saveProductDataToUpdate,
        saveProductSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
