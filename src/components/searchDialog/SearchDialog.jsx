import { Fragment, useContext, useState } from "react";
import {
    Dialog,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineSearch } from "react-icons/ai";
import { Navigate, useNavigate } from "react-router";

export default function SearchDialog() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const context = useContext(myContext);
    const { mode, searchkey,
        setSearchkey, getAllBlog } = context;

    const naviagte = useNavigate();
    return (
        <Fragment>
            {/* Search Icon  */}
            <div onClick={handleOpen}>
                <AiOutlineSearch size={20} color="white" />
            </div>
            {/* Dialog  */}
            <Dialog className=" relative right-[1em] w-[25em]  md:right-0 md:w-0 lg:right-0 lg:w-0" open={open} handler={handleOpen} style={{ background: mode === 'light' ? '#2f3542' : '#2f3542', color: mode === 'dark' ? 'white' : 'black' }}>
                {/* Dialog Body  */}
                <DialogBody >
                    <div className="flex w-full   justify-center">
                        {/* Input  */}
                        <Input
                            color="white"
                            type="search"
                            label="Type here..."
                            value={searchkey}
                            onChange={(e) => setSearchkey(e.target.value)}
                            className=" bg-[#2C3A47]"
                            name="searchkey"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                    </div>


                    {/* Blog Card */}
                    <div className="sm:mx-auto sm:mb-2 mt-4 mb-2">
                        <ul className="w-full">
                            {
                                getAllBlog
                                    .filter((obj) => obj.blogs.title.toLowerCase().includes(searchkey))
                                    .map((item, index) => (
                                        <li key={index} className="w-full mb-4">
                                            <div
                                                onClick={() => naviagte(`/bloginfo/${item.id}`)}
                                                className="container cursor-pointer mx-auto px-4 bg-gray-200 p-2 rounded-lg"
                                            >
                                                {/* Flex container for image and text */}
                                                <div className="flex items-center">
                                                    {/* Blog Thumbnail */}
                                                    <img className="w-20 h-20 mr-4 rounded-lg" src={item.thumbnail} alt="" />

                                                    {/* Text Container */}
                                                    <div className="flex flex-col">
                                                        {/* Blog Date */}
                                                        <p className="text-sm mb-1">{item.date}</p>

                                                        {/* Blog Title */}
                                                        <h1 className="font-bold">{item.blogs.title}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>




                    {/* Heading  */}
                    {/* <div className=" text-center">
                        <h1 className=" text-gray-600">Created by Achira Nadeeshan</h1>
                    </div> */}
                </DialogBody>
            </Dialog>
        </Fragment>
    );
}