import { documentToReactComponents } from "@contentful/rich-text-react-renderer"; // Menggunakan library untuk render RichText

const RichText = ({ document }: { document: any }) => {
  return <div>{documentToReactComponents(document)}</div>;
};

export default RichText;
