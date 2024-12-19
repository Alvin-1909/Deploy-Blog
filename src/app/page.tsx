import contentfulClient from "@/contentful/contentfulClient";
import {
  TypeBlogPostSkeleton,
  IContentfulAsset,
} from "@/contentful/types/blogPost.types";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const getBlogPostContentful = async () => {
  try {
    const data = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
    });
    console.log(data.items);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default async function Home() {
  const posts = await getBlogPostContentful();
  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 className="page-title">Selamat Datang di Resep Nusantara</h1>
        <h4 className="page-subtitle">Mau masak apa hari ini ?</h4>
        <div className="blog-list">
          {posts &&
            posts.items?.map((blog, idx) => (
              <Link href={`/article/${blog.fields.slug}`} key={idx}>
                <div className="blog-card">
                  <Image
                    src={`https:${
                      (blog.fields.image as IContentfulAsset)?.fields.file.url
                    }`}
                    alt={blog.fields.title}
                    width={240}
                    height={240}
                    className="blog-image"
                  />
                  <h3 className="blog-title">{blog.fields.title}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
