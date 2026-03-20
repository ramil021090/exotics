import { useEffect } from "react";
import { useNewsFeedStore } from "../../store/feed/useNewsFeedStore";
const Feeds = () => {
  const fetchFeed = useNewsFeedStore((state) => state.fetchFeed);

  const { feeds, loading } = useNewsFeedStore();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {feeds?.map((post) => (
        // <PostCard key={post.id} post={post} />
        <div key={post.id}>
          <div>{post.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Feeds;
