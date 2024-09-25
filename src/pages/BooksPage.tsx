import { useEffect, useState } from "react";
import { fetchBooks } from "../helper/fetch";
import { Loader } from "../components/Loader";
import { Book } from "../types/Book";
import { BookList } from "../components/BookList";
import { List } from "../components/List";

export const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [booksProductsLoading, setbooksProductsLoading] = useState(false);
    
    useEffect(() => {
        setbooksProductsLoading(true);
        setTimeout(()=> {
            fetchBooks()
            .then(bookProducts => setBooks(bookProducts))
            .catch(error => {
                throw new Error('Error fetching books:', error);
              }
            )
            .finally(() => setbooksProductsLoading(false))
        }, 1000);
    
    }, [])
    
    return  (
        <div>
            
            {booksProductsLoading && <Loader />}

            <List items={books} />
        </div>
    )
}
