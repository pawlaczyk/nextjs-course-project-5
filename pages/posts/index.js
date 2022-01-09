import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

function AllPostsPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() { //nieasynchronicza bo synchornicze czytam pliki
  // getServerSideProps nie ma sensu bo nie chcemy pobierać ciagle dla pojedynczego posta danych
  //jak coś się zmieni - post to trzeb od nowa budować dałą aplikację, dla małego blogu nie jest to uciążliwe
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
    // revalidate: 180  // ale tu się nic w danych nie zmieni i tak trzeba redeploy
  };
}

export default AllPostsPage;
