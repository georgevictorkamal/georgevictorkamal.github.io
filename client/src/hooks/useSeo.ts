

import { useEffect } from "react";
import { updateMetaTags, MetaTagProps } from "@/lib/seo";


export function useSeo(config: MetaTagProps): void {
  useEffect(() => {
    updateMetaTags(config);
  }, [config]);
}


export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
