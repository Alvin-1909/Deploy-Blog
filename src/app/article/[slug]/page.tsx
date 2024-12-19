"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeBlogPostSkeleton,
  IContentfulAsset,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import RichText from "@/components/global/RichText";
import Link from "next/link";

interface ArticleProps {
  image: IContentfulAsset;
  title: string;
  body: any;
}

const ArticleDetail = () => {
  const [article, setArticle] = useState<ArticleProps | null>(null);
  const params = useParams<{ slug: string }>();

  const fetchArticle = async (slug: string) => {
    try {
      const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
        content_type: "blogPost",
        "fields.slug": slug,
      });

      if (data.items.length === 0) throw new Error("Article not found");

      const articleData = data.items[0].fields;
      setArticle({
        image: articleData.image as IContentfulAsset,
        title: articleData.title,
        body: articleData.body,
      });
    } catch (err) {
      console.error("Error fetching article:", err);
      setArticle(null);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      fetchArticle(params.slug);
    }
  }, [params.slug]);

  return (
    <div className="article-detail">
      {article ? (
        <>
          <div className="image-container">
            <Image
              className="article-image"
              src={`https:${article.image.fields.file.url}`}
              alt={article.title}
              width={240}
              height={240}
              // style={{ objectFit: "cover" }}
            />
          </div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-body">
            <RichText document={article.body} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link href={"/"}>
        <button className="back-home-button">Mau cari resep lain ah</button>
      </Link>
    </div>
  );
};

export default ArticleDetail;
