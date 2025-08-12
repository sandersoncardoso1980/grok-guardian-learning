import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
};

const SEO = ({ title, description, canonical }: SEOProps) => {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (name: string, attr: "name" | "property" = "name") => {
      let el = document.querySelector(`meta[${attr}='${name}']`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      return el;
    };

    if (description) {
      ensureMeta("description").setAttribute("content", description);
      ensureMeta("og:description", "property").setAttribute("content", description);
    }

    ensureMeta("og:title", "property").setAttribute("content", title);
    ensureMeta("og:type", "property").setAttribute("content", "website");

    const link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    const canonicalHref = canonical || window.location.href;
    if (link) link.href = canonicalHref;
    else {
      const l = document.createElement("link");
      l.rel = "canonical";
      l.href = canonicalHref;
      document.head.appendChild(l);
    }
  }, [title, description, canonical]);

  return null;
};

export default SEO;
