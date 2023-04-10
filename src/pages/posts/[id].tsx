import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BlogPost, comment } from "../../components/Posts";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";

const PostDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(router.query);
  const [comments, setComments] = useState<comment[]>([]);
  const [post, setPost] = useState<BlogPost>({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  });
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);

        const randomUserId = Math.floor(Math.random() * 10) + 1;
        fetch(`https://jsonplaceholder.typicode.com/users/${randomUserId}`)
          .then((res) => res.json())
          .then((user) => setUser(user))
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error(`error loading comments: ${error}`));
  }, []);

  return (
    <>
      <div id="main-div" className="w-[60%] m-auto max-[750px]:w-full">
        <div className="w-[70%] m-auto pt-[1rem] pb-[2rem]">
          <p className="">
            <Link href="/" className="hover:text-[blue]">
              <span className="">
                <HiOutlineArrowLeft />
              </span>
              Voltar
            </Link>
          </p>
        </div>
        <div id="blog-post" className=" bg-[#D0D1E1] flex flex-col items-center rounded-md">
          <div id="header" className="w-[75%] max-[750px]:w-[90%]">
            <p className="text-[#181717] text-[2rem] capitalize text-center m-auto">
              {post.title}
            </p>
          </div>
          <p className="mt-[1rem]">Post by: {user && user.name}</p>
          <div
            id="body"
            className="   w-[60%] pt-[1rem] pb-[1rem] text-justify text-[1.3rem] max-[750px]:w-[90%]"
          >
            <p className="">{post.body}</p>
          </div>
          </div>
          <div id="comments" className=" flex flex-col items-center " >
            <div className="mt-[2rem] mb-[2rem]  bg-[#3c4345]  text-[#7c7c7c] m-auto"></div>
            <p className="  w-[100%]  font-bold text-center pt-[1rem]">Comentários:</p>
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`p-4 flex flex-col gap-2 rounded-md border-spacing-9 ${
                  index % 2 === 0 ? "bg-[#131313]" : "bg-[#1a1919]"
                }`}
              >
                <p>
                  <span className="font-semibold text-[#adadad]">Nome:</span>{" "}
                  {comment.name}
                </p>
                <p>
                  <span className="font-semibold text-[#d6d4d4]">Email:</span>{" "}
                  {comment.email}
                </p>
                <p>
                  <span className="font-semibold text-[#c5c3c3]">
                    Mensagem:
                  </span>{" "}
                  {comment.body}
                </p>
              </div>
            ))}
          </div>
        
      </div>
    </>
  );
};

export default PostDetails;
