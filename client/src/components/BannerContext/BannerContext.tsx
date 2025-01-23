import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TBanner } from '../../services/server/types';

interface IBannerContext {
    banners: TBanner[] | null;
    setBanners: (banners: TBanner[] | null) => void;
}

const BannerContext = createContext<IBannerContext | undefined>(undefined);

export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [banners, setBanners] = useState<TBanner[] | null>(null);

    return (
        <BannerContext.Provider value={{ banners, setBanners }}>
            {children}
        </BannerContext.Provider>
    );
};

export const useBannerContext = () => {
    const context = useContext(BannerContext);
    if (context === undefined) {
        throw new Error('Error');
    }
    return context;
};
export default BannerContext;