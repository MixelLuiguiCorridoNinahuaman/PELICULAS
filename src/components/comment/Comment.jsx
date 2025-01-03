import { Button } from '@material-tailwind/react';
import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Comment({ addComment, commentText, setcommentText, allComment, fullName, setFullName }) {
  const context = useContext(myContext);
  const { mode } = context;

  const isDisabled = !fullName.trim() || !commentText.trim(); // Disable button only if comment/fullname is empty

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Add Your Comment
          </h2>
        </div>
        {/* Comment Form */}
        <form className="mb-6">
          {/* Full Name Input */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === 'dark' ? '#4b0b1c' : 'rgb(226, 232, 240)',
            }}
          >
            <input
              type="text"
              placeholder="Enter Full Name (Optional)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{
                background: mode === 'dark' ? '#4b0b1c' : 'rgb(226, 232, 240)',
              }}
            />
          </div>

          {/* Text Area */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{
              background: mode === 'dark' ? '#4b0b1c' : 'rgb(226, 232, 240)',
            }}
          >
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              value={commentText}
              onChange={(e) => setcommentText(e.target.value)}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{
                background: mode === 'dark' ? '#4b0b1c' : 'rgb(226, 232, 240)',
              }}
              placeholder="Write a comment..."
              required
            />
          </div>

          {/* Button */}
          <div>
            <Button
              onClick={addComment}
              disabled={isDisabled} // Disable the button only if the comment is empty
              style={{
                background: isDisabled
                  ? 'rgb(209, 213, 219)' // Greyed-out when disabled
                  : mode === 'dark'
                    ? 'rgb(226, 232, 240)'
                    : 'rgb(75, 11, 28)',
                color: isDisabled
                  ? 'rgb(107, 114, 128)' // Subtle text color when disabled
                  : mode === 'dark'
                    ? 'rgb(75, 11, 28)'
                    : 'rgb(226, 232, 240)',
              }}
            >
              Submit
            </Button>
          </div>
        </form>

        {/* Comments Section */}
        <article
          className="p-6 mb-6 text-base rounded-lg"
          style={{
            background: mode === 'dark' ? '#4b0b1c' : 'rgb(226, 232, 240)',
          }}
        >
          <h3 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Comments
          </h3>
          {allComment.length === 0
            ?
            <p className="text-gray-500 dark:text-gray-400 text-md mt-4 ml-0.5" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              No comments yet. Be the first to comment!
            </p>
            :
            allComment.map((item, index) => {
              const { fullName, date, commentText } = item;
              return (
                <React.Fragment key={index}>
                  <footer className="flex justify-between items-center">
                    <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg">
                      <p
                        className="inline-flex items-center mr-3 text-lg"
                        style={{ color: mode === 'dark' ? 'black' : 'black' }}
                      >
                        {fullName}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: mode === 'dark' ? 'black' : 'black' }}
                      >
                        {date}
                      </p>
                    </div>
                  </footer>
                  <p
                    className="text-gray-500 dark:text-gray-400 text-md"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    ↳ {commentText}
                  </p>
                </React.Fragment>
              );
            })}
        </article>
      </div>
    </section>
  );
}

export default Comment
