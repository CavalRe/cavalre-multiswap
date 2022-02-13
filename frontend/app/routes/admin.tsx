import { Outlet, Link, useLoaderData } from "remix";

import { getPosts } from "~/loaders/posts";
import type { Post } from "~/loaders/posts";
import adminStyles from "~/styles/admin.css";

export const links = () => {
    return [{ rel: "stylesheet", href: adminStyles }];
};

export const loader = async () => {
    return getPosts();
};

export default function Admin() {
    const posts = useLoaderData<Post[]>();
    return (
        <div className="admin">
            <nav>
                <h1>Admin</h1>
                <ul>
                    {posts.map(post => (
                        <li key={post.slug}>
                            <Link to={`/posts/${post.slug}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}