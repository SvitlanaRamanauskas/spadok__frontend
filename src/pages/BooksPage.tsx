import { useEffect, useState } from "react";
import { fetchBooks } from "../helper/fetch";
import { Loader } from "../components/Loader";
import { Book } from "../types/Book";
import { List } from "../components/List";

export const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [booksProductsLoading, setBooksProductsLoading] = useState(false);
    
    useEffect(() => {
        setBooksProductsLoading(true);
        setTimeout(()=> {
            fetchBooks()
            .then(bookProducts => setBooks(bookProducts))
            .catch(error => {
                throw new Error('Error fetching books:', error);
              }
            )
            .finally(() => setBooksProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>
            
            {booksProductsLoading && <Loader />}

            <List items={books} />
        </div>
    )
}
