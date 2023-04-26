import { Header } from "./components/common/Header";
import "./App.css";
import { Footer } from "./components/common/Footer";
import { Search } from "./components/search/Search";
import { UserList } from "./components/userList/UserList";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3005/api";

function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(`${baseUrl}/users`)
            .then(response => response.json())
            .then(result => setUsers(result.users));
    }, []);

    console.log(users);

    return (
        <div>
            <Header />

            <main className="main">
                <section className="card users-container">
                    <Search />
                    <UserList users={users}/>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default App;
