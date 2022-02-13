import { Link, useLoaderData } from "remix";
import { getPosts } from "~/loaders/posts";
import type { Post } from "~/loaders/posts";

export const loader = async () => {
  return getPosts();
};

export default function Posts() {
    const posts = useLoaderData<Post[]>();
    return (
        <div>
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