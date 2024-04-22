/* eslint-disable react/prop-types */
import userAvatar from "../assets/images/avatar.png";

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-4 my-4 p-4 bg-gray-200 rounded-lg">
      <img src={userAvatar} className="w-[3rem] h-[3rem]" />
      <div className="flex flex-col">
        <div className="flex gap-2">
          <h1 className="font-semibold">{comment.name}</h1>
          <h1 className="text-gray-500">{comment.time}</h1>
        </div>
        <h1 className="text-gray-800">{comment.comment}</h1>
      </div>
    </div>
  );
};

const CommentsList = ({ comments }) =>
  comments?.map((comment, index) => (
    <div className="commentContainer" key={index}>
      <Comment comment={comment} />
      <div className="replies pl-5 ml-5 border-l-4">
        <CommentsList comments={comment.replies} />
      </div>
    </div>
  ));

export default CommentsList;
