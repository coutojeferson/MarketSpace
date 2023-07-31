import { ReactNode, createContext, useState } from 'react';

export type AppContextDataProps = {
  productPreviewData: ProductDataProps;
  productDataToUpdate: ProductDataProps;
  productSelected: ProductDataProps;
  saveProductPreviewData: (productData: ProductDataProps) => void;
  saveProductDataToUpdate: (productData: ProductDataProps) => void;
  saveProductSelected: (productData: ProductDataProps) => void;
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

type productSelectedPros = {
  id?: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  payment_methods: any;
  product_images: Array<ImageProductProps>;
  listImagesToRemove?: String[];
};

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [productPreviewData, setProductPreviewData] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productDataToUpdate, setProductDataToUpdate] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productSelected, setProductSelected] = useState<ProductDataProps>(
    {} as productSelectedPros,
  );

  function saveProductPreviewData(productData: ProductDataProps) {
    setProductPreviewData(productData);
  }

  function saveProductDataToUpdate(productData: ProductDataProps) {
    setProductDataToUpdate(productData);
  }

  function saveProductSelected(productData: productSelectedPros) {
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
