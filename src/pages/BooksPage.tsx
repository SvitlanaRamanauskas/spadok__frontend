import { useEffect, useState } from "react";
import { fetchBooks, fetchGirlsVyshyvanky } from "../helper/fetch";
import { Loader } from "../components/Loader";
import { Book } from "../types/Book";
import { BookList } from "../components/BookList";

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

            <BookList items={books} />
        </div>
    )
}
