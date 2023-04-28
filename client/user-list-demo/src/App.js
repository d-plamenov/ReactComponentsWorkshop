import * as UserService from './services/UserService';
import { Header } from "./components/common/Header";
import "./App.css";
import { Footer } from "./components/common/Footer";
import { Search } from "./components/search/Search";
import { UserList } from "./components/userList/UserList";
import { useEffect, useState } from "react";



function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        UserService.getAll()
            .then(users => setUsers(users));
    }, []);

    

    console.log(users);

    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList users={users} setUsers={setUsers} />
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
