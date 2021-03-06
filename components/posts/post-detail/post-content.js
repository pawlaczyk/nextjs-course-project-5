//markdown krótszy od html ale może zostać w niego zmieniony(HTML) albo w JSX z jakąs dodatkową bilbioteką
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"; //cjs nie esm bo ma być na serwerze
// lżejsze jest importowanie supportu dla konkrentych języków ale trzeba je zarejestrować 
//then we will have much lighter footprint
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

function PostConentent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  //mówic markdownowi jak ma nadpisać defaultowe  ustawienia - sprawa ładnego wyświetlania obrazka
  const customRenderers = {
    // img(image) {
    //   // metoda z React MArkdown ma atrybut image i dnormalnie zwraca <img/> NIE korzystając z nextjs Image
    //   //image argument alttext to ten z markdowna w []
    //   //image.src to nazwa pliku z markdowna (nextjs-file-based-routing.png)
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       // alt={image.alt}
    //       alt={image.src}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph) {
      //obrazek jest w paragrafie - to robi nextjs
      const { node } = paragraph;
      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              // alt={image.alt}
              alt={`/images/posts/${post.slug}/${image.properties.src}`}
              width={600}
              height={300}
            />
          </div>
        );
      }

      // jak nie ma to zwracam zwykły paragraf
      return <p>{paragraph.children}</p>;
    },

    //stylizacja kodu z markdowna
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          // children={children}
        >{children}</SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />

      {/* z markdowna do (html) jsx */}
      {/* TUUUUUUUUUUUUUUUUUUU <ReactMarkdown components */}
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostConentent;
