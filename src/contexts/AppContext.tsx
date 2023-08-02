import { ReactNode, createContext, useState } from 'react';

export type AppContextDataProps = {
  productPreviewData: ProductDataPropsToPreview;
  productDataToUpdate: ProductDataProps;
  productSelected: ProductSelectedProps;
  saveProductPreviewData: (productData: ProductDataPropsToPreview) => void;
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

type ProductDataPropsToPreview = {
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
    useState<ProductDataPropsToPreview>({} as ProductDataPropsToPreview);

  const [productDataToUpdate, setProductDataToUpdate] =
    useState<ProductDataProps>({} as ProductDataProps);

  const [productSelected, setProductSelected] = useState<ProductSelectedProps>(
    {} as ProductSelectedProps,
  );

  function saveProductPreviewData(productData: ProductDataPropsToPreview) {
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
