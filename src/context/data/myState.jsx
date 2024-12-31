import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage";
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-hot-toast';

function MyState(props) {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    //* getAllBlog State
    const [getAllBlog, setGetAllBlog] = useState([]);

    //* search state
    const [searchkey, setSearchkey] = useState('')

    //* loading state
    const [loading, setloading] = useState(false);

    function getAllBlogs() {
        setloading(true);
        try {
            const q = query(
                collection(fireDB, "blogPost"),
                orderBy('time')
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });

                setGetAllBlog(blogArray)
                console.log(blogArray)
                setloading(false)
            });
            return () => data;
        } catch (error) {
            console.log(error)
            setloading(false)
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, []);

    // Blog Delete Function 
    const deleteBlogs = async (id) => {
        try {
            await deleteDoc(doc(fireDB, "blogPost", id));
            getAllBlogs()
            toast.success("Blogs deleted successfully")
        } catch (error) {
            console.log(error)
        }
    }

    // // Blog Delete Function 
    // const deleteBlogs = async (id, imagePath) => {
    //     try {
    //         await deleteDoc(doc(fireDB, "blogPost", id));

    //         if (imagePath) {
    //             const imageRef = ref(storage, imagePath);
    //             await deleteObject(imageRef);
    //         }

    //         getAllBlogs()
    //         toast.success("Blog deleted successfully")
    //     } catch (error) {
    //         console.error("Error deleting blog:", error);
    //         toast.error("Failed to delete the blog");
    //     }
    // }

    return (
        <MyContext.Provider value={{
            mode,
            toggleMode,
            searchkey,
            setSearchkey,
            loading,
            setloading,
            getAllBlog,
            deleteBlogs
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState