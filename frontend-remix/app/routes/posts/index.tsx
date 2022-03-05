import { Link, useLoaderData } from "remix";
import { getPosts } from "~/components/posts";
import type { Post } from "~/components/posts";

export const loader = async () => {
  return getPosts();
};

export default function Posts() {
    const posts = useLoaderData<Post[]>();
    return (
        <div>
            <Link to="/admin">Admin</Link>
            <h1>Posts</h1>
            <ul>
                {posts.map((post: Post) => (
                    <li key={post.slug}>
                        <Link to={post.slug}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}